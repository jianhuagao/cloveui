import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import '@/styles/background.css';
// import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-twilight.css';
import BackgroundComponent from '@/components/backgroundComponent';
import { ThemeProvider } from '@/context/themeContext';
import { BackgroundProvider } from '@/context/backgroundContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 字体未加载前用系统字体，加载后替换
  fallback: ['system-ui', 'sans-serif'] // 字体加载失败时的兜底方案
});

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
