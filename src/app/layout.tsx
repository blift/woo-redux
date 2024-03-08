import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header/Header'
import Notification from './components/Notification'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header/>
          <Notification />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
