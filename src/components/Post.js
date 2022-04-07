import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deletePost } from '../services/posts'

import moment from 'moment'

export default function Post(props) {

  const dispatch = useDispatch()

  const token = JSON.parse(localStorage.getItem('token'))

  const {postsArray, userInfo} = useSelector(state => ({
    ...state.postReducer,
    ...state.userReducer
  }))
  
  const handleDelete = (id) => {
    console.log(id)
    async function awaitDeletePost() {
      const result = await deletePost(id)
      if(!result) {
        console.log(result)
      } else {
        dispatch({
          type: 'DELPOST',
          payload: id
        })
      }
    }
    awaitDeletePost()
  }
 
  return (
    <article className='bg-slate-900 text-slate-200 rounded shadow-lg flex flex-col' id={props.id}>
      <div className='p-2 flex bg-slate-700 space-x-2'>
        <img src={props.author.avatar} className='w-10 h-10 rounded-full border-2 border-slate-400'/>
        <div className='flex flex-col rounded w-full'>
          <h2 className='text-sm font-medium'>{props.author.firstname} {props.author.lastname}</h2>
          <span className='text-xs'>{moment(props.date).format('LLL')}</span>
        </div>
        {token.userId === props.author.id ? <button onClick={(e) => e.preventDefault(handleDelete(props.id))} className='transition-all duration-200 bg-red-500 hover:bg-red-600 text-sm text-white w-10 h-10 rounded-lg'><i className='fas fa-trash' /></button> : <p>non</p>}
      </div>
      <div className='p-2'>
        {props.img && <img src={props.img} className='ml-auto mr-auto h-60 object-cover rounded shadow-lg'/>}
        {props.msg && <p className='p-4 text-sm'>{props.msg}</p>}
      </div>
    </article>
  )
}
