import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import logoWhite from '../assets/icon-left-font-monochrome-white.svg'

import {getLogin} from '../services/login'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const {userForm, msgState, msgForm} = useSelector(state => ({
        ...state.formReducer
      }))

    const handleLogin = () => {
        async function repLogin() {
            const result = await getLogin(user.email, user.password)
            if(!result) {
                dispatch({
                    type:'ERRLOGIN',
                    payload: user
                })
            } else {
                setUser({
                    ...user,
                    email: '',
                    password: ''
                })
                localStorage.setItem('token', JSON.stringify(result))
                window.location.reload(false)
            }
        }
        repLogin()
    }
    
    const handleInput = (e) => {
        if(msgForm) {
            dispatch({
                type: 'ERRASE',
                payload:user
            })
        }
        if(e.target.id === 'email') {
            setUser({
                ...user,
                email: e.target.value
            })
        }
        else if(e.target.id === 'password') {
            setUser({
                ...user,
                password: e.target.value
            })
        }
    }

  return (
    <div className='min-h-screen w-full bg-slate-900 flex justify-center'>

        <div className='w-full md:w-8/12 lg:w-6/12 mt-auto mb-auto bg-slate-700 p-4 rounded flex flex-col items-center space-y-6 shadow-lg'>

            <img src={logoWhite} className='w-9/12 md:w-6/12'/>

            <p className={msgState === 1 ? 'h-6 text-xs text-emerald-400 font-medium' : 'h-6 text-xs text-rose-400 font-medium'}>{msgForm}</p>

            <form onSubmit={(e) => e.preventDefault(handleLogin())} className='mt-2 flex flex-col w-full space-y-2'>
                <label htmlFor='email' className='text-white font-medium'>E-mail</label>
                <input
                value={user.email}
                onChange={handleInput} 
                placeholder='Votre e-mail'
                type='email' 
                id='email' 
                className='p-2 rounded outline-none' />
                <label htmlFor='password' className='text-white font-medium'>Mot de passe</label>
                <input 
                value={user.password}
                onChange={handleInput}
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
