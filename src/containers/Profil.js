import React, {useState, useEffect} from 'react'
import {getUser} from '../services/profil'

export default function Profil() {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        avatar: ''
    })
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        async function getInfo() {
            const result = await getUser(token.userId, token.token)
            if(!result) {
              console.log('erreur')
            }
            else {
              setUser(result)
            }
          }
          getInfo()
    }, [])

    const handleRank = () => {
        if(user.admin) {
            return <span id='rank' className='mr-2 ml-auto w-16 h-4 rounded-lg text-center text-xs bg-rose-300 font-medium text-rose-900 shadow'>Admin</span>
        } else {
            return <span id='rank' className='mr-2 ml-auto w-16 h-4 rounded-lg text-center text-xs bg-sky-400 font-medium text-sky-900 shadow'>Membre</span>
        }
    }

  return (
    <section id='profil' className='h-screen bg-slate-900 pt-20'>
        <div className='mt-10 p-2 bg-slate-800 w-full flex flex-col space-y-4'>
            <h1 className='flex items-center text-slate-400 font-bold text-2xl uppercase'>{user.firstname} {user.lastname} {handleRank()}</h1>
            <img src={user.avatar} className='w-20 h-20 object-cover ml-auto mr-auto rounded-full shadow-lg'/>
            <div className='flex flex-col space-y-1'>
                <h2 className='font-medium text-slate-400'>Contact :</h2>
                <span className='text-slate-300 text-sm'><i className='fas fa-at text-sky-400' />  {user.email}</span>
            </div>
        </div>
    </section>
  )
}
