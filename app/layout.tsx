import type { Metadata } from 'next'
import { DM_Serif_Display, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const serifFont = DM_Serif_Display({ 
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Space_Grotesk({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oscar Wilde: Biography and Literary Style',
  description: 'A diploma thesis presentation exploring Oscar Wilde\'s life, works, and literary techniques',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
