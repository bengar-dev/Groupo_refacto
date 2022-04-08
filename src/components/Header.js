import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import logowhite from '../assets/icon-left-font-monochrome-white.svg'

import { getUser } from '../services/profil'

export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    if(!toggle) {
      document.getElementById('toggle-user').classList.remove('-right-40')
      document.getElementById('toggle-user').classList.add('right-2')
    } else {
      document.getElementById('toggle-user').classList.add('-right-40')
      document.getElementById('toggle-user').classList.remove('right-2')
    }
  }

  const handleDisconnect = () => {
    localStorage.clear('token')
    window.location.reload(false)
  }

  console.log(userInfo)

  return (
    <header className='fixed top-0 z-10 w-full h-20 bg-slate-700 shadow-lg flex items-center justify-between'>
      <img src={logowhite} className='w-40 h-auto p-2 cursor-pointer' onClick={(e) => e.preventDefault(navigate('/'))}/>
      <div className='flex items-center space-x-2 p-2'>
        <img 
        onClick={handleToggle}
        src={userInfo.imgtemp ? userInfo.imgtemp : userInfo.avatar} className='object-cover transition-all duration-200 w-14 h-14 rounded-full border-2 border-slate-400 hover:grayscale shadow-xl cursor-pointer'/>
      </div>
        <div id='toggle-user' className='transition-all absolute bg-white -right-40 top-20 p-2 shadow-lg rounded'>
          <ul className='text-sm'>
            <li onClick={handleToggle}><Link to={'/profil/' + userInfo.id}>Mon profil</Link></li>
            <li onClick={handleToggle}><Link to={'/editprofil'}>Editer mon profil</Link></li>
            <li className='cursor-pointer' onClick={() => handleDisconnect()}>Déconnexion</li>
          </ul>
      </div>
    </header>
  )
}
