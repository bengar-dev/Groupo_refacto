import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getRegister } from '../services/register'
import { checkPass, checkEmail } from '../functions/check'

import logoWhite from '../assets/icon-left-font-monochrome-white.svg'

export default function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    msgError: '',
    emailState: 1,
    pwState: 0
  })
  
  const {userForm} = useSelector(state => ({
    ...state.formReducer
  }))

  const handleInput = (e) => {
    if(e.target.id === 'email') {
      if(checkEmail(e.target.value)) {
        console.log('ezaeza')
        setUser({
          ...user,
          email: e.target.value,
          emailState: 1
        })
      } else {
        setUser({
          ...user,
          email: e.target.value,
          emailState: 0
        })
      }
    }
    else if(e.target.id === 'firstname') {
      setUser({
        ...user,
        firstname: e.target.value
      })
    }
    else if(e.target.id === 'lastname') {
      setUser({
        ...user,
        lastname: e.target.value
      })
    }
    else if(e.target.id === 'password') {
      if(checkPass(e.target.value)) {
        setUser({
          ...user,
          password: e.target.value,
          pwState: 1
        })
      } else {
        setUser({
          ...user,
          password: e.target.value,
          pwState: 0
        })
      }
    }
  }

  const handleSubmit = () => {

    async function repRegister() {
      const result = await getRegister(user.email, user.password, user.firstname, user.lastname)
      console.log(result)
      if(!result) {
        setUser({
          ...user,
          msgError: 'Erreur : Cette email existe déjà'
        })
      }
      else {
        dispatch({
          type: 'REGISTER',
          payload: user
        })
    
        setUser({
          email: '',
          firstname: '',
          lastname: '',
          password: ''
        })
    
        navigate('/')
      }
    }

    if (!user.email || !user.firstname || !user.lastname || !user.password) {
      setUser({
        ...user,
        msgError: 'Tous les champs doivent être remplis'
      })
    }
    else if (!checkEmail(user.email)) {
      setUser({
        ...user,
        msgError: "Vérifier le format de l'email"
      })
    }
    else if (!checkPass(user.password)) {
      setUser({
        ...user,
        msgError: 'Le mot de passe doit contenir 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre'
      })
    }
    else {
      repRegister()
    }

  }

  return (
    <div className='min-h-screen w-full bg-slate-900 flex justify-center'>

        <div className='w-full md:w-8/12 lg:w-6/12 mt-auto mb-auto bg-slate-700 p-4 rounded flex flex-col items-center space-y-6 shadow-lg'>

            <img src={logoWhite} className='w-9/12 md:w-6/12'/>

            <p className='h-6 text-xs text-rose-400 font-medium'>{user.msgError}</p>

            <form onSubmit={(e) => e.preventDefault(handleSubmit())} className='mt-4 flex flex-col w-full space-y-2'>
                <label htmlFor='email' className='text-white font-medium'>E-mail</label>
                <input
                value={user.email}
                onChange={handleInput} 
                placeholder='Votre e-mail'
                type='email' 
                id='email' 
                className={user.emailState === 1 ? 'transition-all duration-200 p-2 rounded outline-none border' : 'transition-all duration-200 p-2 rounded outline-none border border-red-600'} />
                <label htmlFor='firstname' className='text-white font-medium'>Prénom</label>
                <input 
                value={user.firstname}
                onChange={handleInput} 
                placeholder='Votre prénom'
                type='text' 
                id='firstname' 
                className='p-2 rounded outline-none' />
                <label htmlFor='lastname' className='text-white font-medium'>Nom</label>
                <input 
                value={user.lastname}
                onChange={handleInput} 
                placeholder='Votre nom de famille'
                type='text' 
                id='lastname' 
                className='p-2 rounded outline-none' />
                <label htmlFor='password' className='text-white font-medium'>Mot de passe</label>
                <input 
                value={user.password}
                onChange={handleInput} 
                placeholder='Votre mot de passe'
                type='password' 
                id='password' 
                className='p-2 rounded outline-none' />
                <span className='flex space-x-1 bg-slate-300 w-max p-1 rounded-full font-medium text-slate-900'>
                  <i className={user.pwState === 1 ? 'fas fa-check text-xs text-emerald-600' : 'fas fa-times text-xs text-pink-600'} />
                  <p className='text-xs'>8 caractères 1 majuscule 1 miniscule 1 chiffre</p>
                </span>
                <button
                type='submit'
                className='transition-all duration-200 bg-slate-300 p-2 rounded font-medium text-slate-900 hover:bg-emerald-400'>Envoyer</button>
            </form>

            <div className='h-px w-full bg-slate-500'></div>

            <p className='font-medium text-sm text-slate-900'>Déjà enregistré ? 
            <Link 
            to='/' 
            className='transtion-all duration-200 ml-1 text-slate-300 hover:text-emerald-400'>Identifiez vous dès maintenant</Link></p>

        </div>

    </div>
  )
}
