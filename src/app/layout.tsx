import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Github Contribution Battle',
  description: 'Let the battle begin!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}