import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deletePost, editPost } from '../services/posts'
import { parseHtmlEntities } from '../functions/htmlentities'

import moment from 'moment'

export default function Post(props) {

  const dispatch = useDispatch()

  const token = JSON.parse(localStorage.getItem('token'))

  const [toggle, setToggle] = useState(true)
  const [post, setPost] = useState({
    postId: props.id,
    content: props.msg,
    img: props.img,
    imgtemp: ''
  })

  const [delImg, setDelImg] = useState(false)

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

  const handleDeleteImg = (id) => {
    dispatch({
      type: 'DELIMG',
      payload: post
    })
    setDelImg(1)
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleInput = (e) => {
    if(e.target.id === 'edit-text') {
      setPost({
        ...post,
        content: e.target.value
      })
    }
  }

  const handleEdit = (id, img, msg, delimg) => {
    async function awaitEdit() {
      const result = await editPost(id, post.img ? post.img : img , msg, delImg)
      if(!result) {
        console.log('erreur')
      } else {
        dispatch({
          type: 'EDITPOST',
          payload: post
        })
        setToggle(!toggle)
      }
    }
    awaitEdit()
  }
 
  const changeFile = (e) => {
    const reader = new FileReader() // Utilisation de FileReader pour réaliser une preview image.
    reader.onloadend = () => {
        setPost({
          ...post,
          img: e.target.files[0],
          imgtemp: reader.result
        }) // stockage du résultat FileReader dans un state image Preview
        /*updateImgtempoMsg(reader.result)*/
    }
    reader.readAsDataURL(e.target.files[0])
    setPost({
      ...post,
      img: e.target.files[0],
      imgtemp: reader.result
    }) // stockage du fichier charger dans un state Image
  }

  return (
    <article className='bg-slate-900 text-slate-200 rounded shadow-lg flex flex-col' id={props.id}>
      <div className='p-2 flex bg-slate-700 space-x-2'>
        <img src={props.author.avatar} className='w-10 h-10 rounded-full border-2 border-slate-400'/>
        <div className='flex flex-col rounded w-full'>
          <h2 className='text-sm font-medium'>{props.author.firstname} {props.author.lastname}</h2>
          <span className='text-xs'>{moment(props.date).format('LLL')}</span>
        </div>
        {token.userId === props.author.id ? <button onClick={(e) => e.preventDefault(handleToggle())} className='transition-all duration-200 bg-orange-500 hover:bg-orange-600 text-sm text-white w-10 h-10 rounded-lg cursor-pointer'><i className='fas fa-edit' /></button> : ''}
        {token.userId === props.author.id ? <button onClick={(e) => e.preventDefault(handleDelete(props.id))} className='transition-all duration-200 bg-red-500 hover:bg-red-600 text-sm text-white w-10 h-10 rounded-lg cursor-pointer'><i className='fas fa-trash' /></button> : ''}
      </div>
      {toggle ? <div className='p-2'>
        {post.imgtemp ? <img src={post.imgtemp} className='ml-auto mr-auto h-60 object-cover rounded shadow-lg'/> : props.img && <img src={props.img} className='ml-auto mr-auto h-60 object-cover rounded shadow-lg'/>}
        {props.msg && <p className='p-4 text-sm'>{parseHtmlEntities(props.msg)}</p>}
      </div>
      :
      <form className='relative p-2 flex flex-col space-y-2'>
        {post.imgtemp ? <img src={post.imgtemp} className='ml-auto mr-auto h-60 object-cover rounded shadow-lg'/> : props.img && <img src={props.img} className='ml-auto mr-auto h-60 object-cover rounded shadow-lg'/> }
        {props.img && 
        <div className='flex w-full'>
          <label htmlFor='img-edit' className='cursor-pointer text-center w-1/2 transition-all duration-200 p-1 bg-orange-400 hover:bg-orange-800 text-orange-900 hover:text-white' aria-hidden="true"><i className="fas fa-images"></i><p className='hidden'>Image</p>
          <input type='file' className='w-0' id='img-edit' accept='images/*' onChange={(e) => changeFile(e)}/></label>
          <button onClick={(e) => e.preventDefault(handleDeleteImg(props.id))} className='w-1/2 transition-all duration-200 p-1 bg-red-400 hover:bg-red-800 text-red-900 hover:text-white'><i className='fas fa-trash' /></button>
        </div>
        }
        <label htmlFor='edit-text'></label>
        <textarea id='edit-text'
        value={parseHtmlEntities(post.content)}
        onChange={(e) => handleInput(e)} 
        className='p-2 text-sm w-full resize-none h-40 bg-slate-400 text-slate-900 outline-none'>
        </textarea>
        {!props.img && <label htmlFor='img-edit' className='cursor-pointer text-center w-full transition-all duration-200 p-1 bg-orange-400 hover:bg-orange-800 text-orange-900 hover:text-white' aria-hidden="true"><i className="fas fa-images"></i><p className='hidden'>Image</p>
        <input type='file' className='w-0' id='img-edit' accept='images/*' onChange={(e) => changeFile(e)}/></label>}
        <button type='submit'
        onClick={(e) => e.preventDefault(handleEdit(props.id, props.img, post.content))}
        className='transition-all duration-200 p-2 text-slate-900 bg-slate-300 hover:bg-emerald-400 hover:text-white'>Editer</button>
      </form>
      }
    </article>
  )
}
