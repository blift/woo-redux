"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from './store'
import Header from './components/Header/Header'
import Notification from './components/Notification'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <Header/>
          <Notification />
          {children}
        </body>
      </html>
    </Provider>
  )
}
