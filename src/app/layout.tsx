import './globals.css'
import type { Metadata } from 'next'
import { KumaRegistry } from '@kuma-ui/next-plugin/registry'
import { Raleway } from 'next/font/google'

const RalewayFont = Raleway({
  weight: '400',
  subsets: ['latin'],
})

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
      <body className={RalewayFont.className}>
        <KumaRegistry>{children}</KumaRegistry>
      </body>
    </html>
  )
}
