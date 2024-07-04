import React from 'react'
import Image from 'next/image'

function NavBar() {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1616910111011-888888888888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
        width={100}
        height={100}
        alt='ok'
      />
    </div>
  )
}

export default NavBar
