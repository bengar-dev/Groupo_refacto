import React, {useEffect} from 'react'

import logowhite from '../assets/icon-left-font-monochrome-white.svg'

import { getUser } from '../services/profil'

export default function Header() {

  useEffect(() => {
    async
  }, [])

  return (
    <header className='fixed top-0 z-10 w-full h-20 bg-slate-700 shadow-lg flex items-center justify-around'>
      <img src={logowhite} className='w-40 h-auto'/>
      <div>

      </div>
    </header>
  )
}
