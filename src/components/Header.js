import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import logowhite from '../assets/icon-left-font-monochrome-white.svg'

import { getUser } from '../services/profil'

export default function Header() {

  const dispatch = useDispatch()

  const getToken = JSON.parse(localStorage.getItem('token'))

  const [toggle, setToggle] = useState(false)

  const {userInfo} = useSelector(state => ({
    ...state.userReducer
  }))

  useEffect(() => {
    async function getInfo() {
      const result = await getUser(getToken.userId, getToken.token)
      if(!result) {
        console.log('erreur')
      }
      else {
        dispatch({
          type: 'GETUSER',
          payload: result
        })
      }
    }
    getInfo()
  }, [])

  const handleToggle = () => {
    setToggle(!toggle)
    if(toggle) {
      document.getElementById('toggle-user').classList.remove = 'hidden'
    } else {
      document.getElementById('toggle-user').classList.add = 'hidden'
    }
  }

  return (
    <header className='fixed top-0 z-10 w-full h-20 bg-slate-700 shadow-lg flex items-center justify-around'>
      <img src={logowhite} className='w-40 h-auto'/>
      <div className='flex items-center space-x-2'>
        <img 
        onClick={handleToggle}
        src={userInfo.avatar} className='w-10 h-10 rounded-full border-2 border-slate-400 shadow-xl cursor-pointer'/>
      </div>
        <div id='toggle-user' className='transition-all absolute bg-slate-700 right-0 top-20 p-2 shadow-lg hidden'>
          <ul className='text-sm'>
            <li>Mon profil</li>
            <li>Editer mon profil</li>
            <li>Déconnection</li>
          </ul>
      </div>
    </header>
  )
}
