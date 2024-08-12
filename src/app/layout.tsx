import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/themeContext';

import '@/styles/globals.scss';
// import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-twilight.css';
import BackgroundComponent from '@/components/backgroundComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloveUI',
  description: 'A Tailwind CSS component library'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundComponent />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
