import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { join } from 'path';
import { promises as fs } from 'fs';

import '@/styles/globals.scss';
// import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-twilight.css';
import BackgroundComponent from '@/components/backgroundComponent';
import { RouterProvider } from '@/context/routerContext';
import { ThemeProvider } from '@/context/themeContext';
import { BackgroundProvider } from '@/context/backgroundContext';
import { MenuItemProps } from '@/components/menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloveUI',
  description: 'A Tailwind CSS component library'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const componentsByCategory = await getComponents();
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundProvider>
          <BackgroundComponent />
          <ThemeProvider>
            <RouterProvider menuItems={componentsByCategory}>{children}</RouterProvider>
          </ThemeProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}

async function getComponents() {
  let menuItems: MenuItemProps[] = [];

  const componentsTypePath = join(process.cwd(), '/src/data/components');
  const componentsTypeSlugs = await fs.readdir(componentsTypePath);

  for (const componentsTypeSlug of componentsTypeSlugs) {
    const menuNewItem: MenuItemProps = { title: componentsTypeSlug, slug: componentsTypeSlug };

    const typeMainPath = join(componentsTypePath, componentsTypeSlug);

    const typeUiArr = await fs.readdir(typeMainPath);

    const childrenPromises = typeUiArr.map(async typeUiSlug => {
      const typeUiName = typeUiSlug.replace('.mdx', '');
      return { title: typeUiName, slug: `${componentsTypeSlug}/${typeUiName}` };
    });

    const children = await Promise.all(childrenPromises);
    menuNewItem.children = children;
    menuItems.push(menuNewItem);
  }
  return menuItems;
}
