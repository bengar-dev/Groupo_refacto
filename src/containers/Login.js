import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import logoWhite from '../assets/icon-left-font-monochrome-white.svg'

export default function Login() {

    const {userForm, msgForm} = useSelector(state => ({
        ...state.formReducer
      }))

  return (
    <div className='min-h-screen w-full bg-slate-900 flex justify-center'>

        <div className='w-full md:w-8/12 lg:w-6/12 mt-auto mb-auto bg-slate-700 p-4 rounded flex flex-col items-center space-y-6 shadow-lg'>

            <img src={logoWhite} className='w-9/12 md:w-6/12'/>

            <p className='h-6 text-xs text-emerald-400 font-medium'>{msgForm}</p>

            <form className='mt-2 flex flex-col w-full space-y-2'>
                <label htmlFor='email' className='text-white font-medium'>E-mail</label>
                <input 
                placeholder='Votre e-mail'
                type='email' 
                id='email' 
                className='p-2 rounded outline-none' />
                <label htmlFor='password' className='text-white font-medium'>Mot de passe</label>
                <input 
                placeholder='Votre mot de passe'
                type='password' 
                id='password' 
                className='p-2 rounded outline-none' />
                <button
                type='submit'
                className='transition-all duration-200 bg-slate-300 p-2 rounded font-medium text-slate-900 hover:bg-emerald-400'>Envoyer</button>
            </form>

            <div className='h-px w-full bg-slate-500'></div>

            <p className='font-medium text-sm text-slate-900'>Pas encore enregistré ? 
            <Link 
            to='/register' 
            className='transtion-all duration-200 ml-1 text-slate-300 hover:text-emerald-400'>Enregistrer vous dès maintenant</Link></p>

        </div>

    </div>
  )
}
