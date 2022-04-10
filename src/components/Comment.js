import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'

import { delCmt, editCmt } from '../services/cmts'

export default function Comment(props) {

  const dispatch = useDispatch()

  const [toggle, setToggle] = useState(false)
  const [cmt, setCmt] = useState({
    id: props.id,
    postId: props.postId,
    msg: props.msg,
    userId: props.author.id,
    User: props.author
  })
  const {cmtsArray} = useSelector(state => ({
    ...state.cmtReducer
  }))

  const delComment = (cmtid) => { // fonction suppression de commentaire
    async function awaitDelComment() {
      const result = await delCmt(cmtid)
      if(!result) {
        console.log('erreur')
      }
      else {
        dispatch({
          type: 'DELCMT',
          payload: cmtid
        })
      }
    }
    awaitDelComment()
  }

  const handleInput = (e) => { // update state champs input edit commentaire
    if(e.target.id === 'edit-cmt') {
      setCmt({
        ...cmt,
        msg: e.target.value
      })
    }
  }

  const editComment = (cmtid) => { // fonction editer commentaire
    async function awaitEditComment() {
      const result = await editCmt(cmtid, cmt.msg)
      if(!result) {
        console.log('erreur')
      } else {
        dispatch({
          type: 'EDITCMT',
          payload: cmt
        })
      }
    }
    awaitEditComment()
  }

  const handleToggle = () => { //fonction gestion du toggle édition
    setToggle(!toggle)
  }

  return (
    <div className='mt-4 bg-slate-800 flex flex-col rounded shadow'>
        <div className='p-1 flex items-center space-x-2'>
            <img src={props.author.avatar} className='w-8 h-8 object-cover rounded-full'/>
            <div className='flex flex-col w-full'>
                <h3 className='font-medium text-sm'><Link to={'/profil/' + props.author.id}>{props.author.firstname} {props.author.lastname}</Link></h3>
                <p className='font-light text-xs'>{moment(props.date).format('LLL')}</p>
            </div>
            <div className='p-2 flex space-x-2'>
              <button 
              onClick={(e) => e.preventDefault(handleToggle())}
              className='transition-all duration-200 w-6 h-6 rounded text-white bg-orange-500 hover:bg-orange-600 text-xs'><i className='fas fa-pen' /></button>
              <button 
              onClick={(e) => e.preventDefault(delComment(props.id))}
              className='transition-all duration-200 w-6 h-6 rounded text-white bg-red-500 hover:bg-red-600 text-xs'><i className='fas fa-trash' /></button>
            </div>
        </div>
        {toggle ? // si le toggle est actif alors on affiche les champs d'édition de commentaire
          <div className='flex p-2 text-sm bg-slate-700'>
            <label htmlFor='edit-cmt'></label>
            <input
            onChange={handleInput}
            value={cmt.msg}
            className='p-2 w-full outline-none text-slate-900'
            type='text' id='edit-cmt' />
            <button 
            onClick={(e) => e.preventDefault(editComment(props.id))}
            className='flex items-center justify-center p-2 bg-emerald-400 text-emerald-800'><i className='fas fa-paper-plane' /></button>
          </div>
        : <p className='p-2 text-sm bg-slate-700'> {/*sinon on affiche tout simplement le message du commentaire*/}
        {props.msg}
    </p>}
    </div>
  )
}
