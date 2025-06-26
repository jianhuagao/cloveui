import localFont from 'next/font/local';

export const geistMomo = localFont({
  src: '../../public/fonts/geist-mono/geist-mono-v3-latin-regular.woff2',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  variable: '--font-geist-mono'
});

export const geist = localFont({
  src: [
    {
      path: '../../public/fonts/geist/geist-v3-latin-100.woff2',
      weight: '100'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-200.woff2',
      weight: '200'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-300.woff2',
      weight: '300'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-regular.woff2',
      weight: '400'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-500.woff2',
      weight: '500'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-600.woff2',
      weight: '600'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-700.woff2',
      weight: '700'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-800.woff2',
      weight: '800'
    },
    {
      path: '../../public/fonts/geist/geist-v3-latin-900.woff2',
      weight: '900'
    }
  ],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  variable: '--font-geist'
});
