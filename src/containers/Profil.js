import React, {useState, useEffect} from 'react'
import {getUser} from '../services/profil'
import { useNavigate, useParams } from 'react-router-dom'

export default function Profil() {

    const navigate = useNavigate()
    const params = useParams()

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        avatar: ''
    })
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        async function getInfo() {
            const result = await getUser(params.id, token.token)
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
    <section id='profil' className='h-screen bg-slate-900 pt-20 w-full md:w-9/12 lg:w-7/12'>
        <div className='relative mt-10 p-2 bg-slate-800 w-full flex flex-col space-y-4'>
            <h1 className='flex items-center text-slate-400 font-bold text-2xl uppercase'>{user.firstname} {user.lastname} {handleRank()}</h1>
            <img src={user.avatar} className='md:shadow-xl md:border-2 md:border-slate-400 w-20 h-20 md:w-40 md:h-40 object-cover ml-auto mr-auto rounded-full shadow-lg'/>
            <div className='flex flex-col space-y-1'>
                <h2 className='font-medium text-slate-400'>Contact :</h2>
                <span className='text-slate-300 text-sm'><i className='fas fa-at text-sky-400' />  {user.email}</span>
            </div>
            <button
            onClick={(e) => e.preventDefault(navigate('/'))} 
            className='flex items-center justify-center w-10 transition-all absolute bottom-2 right-2 bg-slate-400 hover:bg-slate-500 text-slate-800 p-1 rounded'><i className='fas fa-arrow-left' /></button>
        </div>
    </section>
  )
}
