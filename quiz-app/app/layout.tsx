import type { Metadata } from 'next'
import './globals.css'
import { PageTransition } from '@/components/ui/page-transition'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'quiz app',
  description: 'Created by Angshuman, Rayyan, Anshuman',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
        <Header />
        <PageTransition>
          <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </PageTransition>
        <Toaster />
      </body>
    </html>
  )
}
