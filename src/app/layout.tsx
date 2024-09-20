import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.scss';
// import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-twilight.css';
import BackgroundComponent from '@/components/backgroundComponent';
import { ThemeProvider } from '@/context/themeContext';
import { BackgroundProvider } from '@/context/backgroundContext';

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundProvider>
          <BackgroundComponent />
          <ThemeProvider>{children}</ThemeProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
