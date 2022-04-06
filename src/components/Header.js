import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import logowhite from '../assets/icon-left-font-monochrome-white.svg'

import { getUser } from '../services/profil'

export default function Header() {

  const dispatch = useDispatch()

  const getToken = JSON.parse(localStorage.getItem('token'))

  const {userInfo} = useSelector(state => ({
    ...state.userReducer
  }))

  console.log(userInfo)

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

  return (
    <header className='fixed top-0 z-10 w-full h-20 bg-slate-700 shadow-lg flex items-center justify-around'>
      <img src={logowhite} className='w-40 h-auto'/>
      <div>

      </div>
    </header>
  )
}
