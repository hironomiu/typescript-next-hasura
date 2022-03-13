import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex flex-col bg-gray-300 w-screen">
      <header className="flex flex-row h-10 justify-between items-center">
        <div className="ml-4">
          <Link href="/">
            <a className="px-2">Home</a>
          </Link>
          <Link href="/tab-a">
            <a className="px-2">TabA</a>
          </Link>
          <Link href="/tab-b">
            <a className="px-2">TabB</a>
          </Link>
          <Link href="/hasura-fetch">
            <a className="px-2">Hasura Fetch</a>
          </Link>
        </div>
        <div className="mr-4">SignOut</div>
      </header>
    </div>
  )
}

export default Header
