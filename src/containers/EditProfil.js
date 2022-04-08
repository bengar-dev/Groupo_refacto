import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {getUser, editUser} from '../services/profil'

export default function EditProfil() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const [user, setUser] = useState({})
    const [msg, setMsg] = useState('')

    const {userInfo} = useSelector(state => ({
        ...state.userReducer
      }))

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

    const handleInput = (e) => {
        if(e.target.id === 'firstname') {
            setUser({
                ...user,
                firstname: e.target.value
            })
        }
        if(e.target.id === 'lastname') {
            setUser({
                ...user,
                lastname: e.target.value
            })
        }
    }

    const editProfil = () => {
        async function awaitEdit() {
            const result = await editUser(user.firstname, user.lastname, user.avatar)
            if(!result) {
                console.log('erreur')
            }
            else {
                dispatch({
                    type: 'EDITUSER',
                    payload: user
                })
                setMsg('Votre profil a bien été modifié.')

            }
        }
        awaitEdit()
    }

    const changeFile = (e) => {
        const reader = new FileReader() // Utilisation de FileReader pour réaliser une preview image.
        reader.onloadend = () => {
            setUser({
              ...user,
              avatar: e.target.files[0],
              imgtemp: reader.result
            }) // stockage du résultat FileReader dans un state image Preview
            /*updateImgtempoMsg(reader.result)*/
        }
        reader.readAsDataURL(e.target.files[0])
        setUser({
          ...user,
          avatar: e.target.files[0],
          imgtemp: reader.result
        }) // stockage du fichier charger dans un state Image
      }

    window.addEventListener(('click', 'scroll'), function() {
        setMsg('')
    })

  return (
    <div className='h-screen bg-slate-900 pt-20'>
        <div className='relative mt-10 p-2 bg-slate-800 w-full flex flex-col space-y-4'>
            <h1 className='text-slate-400 font-medium text-lg'><i className='fas fa-user-edit' /> Editer mon profil</h1>
            <button 
            onClick={(e) => e.preventDefault(navigate('/'))}
            className='flex items-center justify-center w-10 transition-all absolute top-0 right-2 bg-slate-400 hover:bg-slate-500 text-slate-800 p-1 rounded'><i className='fas fa-arrow-left' /></button>
            <form className='flex flex-col text-slate-400'>
                <label htmlFor='img' aria-hidden="true"><img src={user.imgtemp ? user.imgtemp : user.avatar} className='cursor-pointer transition-all duration-200 w-20 h-20 rounded-full shadow-lg ml-auto mr-auto hover:grayscale object-cover'/><p className='hidden'>Image</p>
                <input 
                onChange={(e) => e.preventDefault(changeFile(e))}
                type='file' className='w-0' id='img' accept='images/*'/></label>
                <p className='h-6 text-center text-sm font-medium text-emerald-400'>{msg}</p>
                <label htmlFor='firstname' className='mt-2 ml-2 font-medium'>Prénom</label>
                <input
                onChange={handleInput} 
                className='p-2 outline-none rounded text-slate-500'
                type='text' id='firstname' value={user.firstname} />
                <label htmlFor='lastname' className='mt-2 ml-2 font-medium'>Nom</label>
                <input
                onChange={handleInput} 
                className='p-2 outline-none rounded text-slate-500'
                type='text' id='lastname' value={user.lastname} />
                <label htmlFor='email' className='flex items-center mt-2 ml-2 font-medium'>E-mail <p className='text-xs ml-2 text-slate-200'>Contacter un admin pour changer l'email</p></label>
                <input 
                className='p-2 text-slate-900 outline-none rounded'
                type='email' id='email' value={user.email}/>
                <button 
                onClick={(e) => e.preventDefault(editProfil())}
                className='mt-2 p-2 transition-all duration-200 bg-slate-400 hover:bg-emerald-400 text-slate-800 font-medium'>Editer</button>
            </form>
        </div>

    </div>
  )
}
