import localFont from 'next/font/local';
export const inter = localFont({
  src: './fonts/inter-latin-variable.woff2',
  variable: '--font-body',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: 'Arial',
});
export const montserrat = localFont({
  src: './fonts/montserrat-latin-variable.woff2',
  variable: '--font-heading',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: 'Arial',
});
