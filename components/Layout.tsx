import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: ReactNode
  title: string
}

const Layout = ({ children, title }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
