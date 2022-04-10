import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendPost } from '../services/posts'
import {htmlEntities, parseHtmlEntities} from '../functions/htmlentities'

export default function PublishPost() {

  const {postsArray, userInfo} = useSelector(state => ({
    ...state.postReducer,
    ...state.userReducer
  }))

  const dispatch = useDispatch()

  const [toggle, setToggle] = useState(true)
  const [post, setPost] = useState({
    content: '',
    img: null,
    imgtemp: ''
  })

  const handleToggle = () => {
    setToggle(!toggle)
    if(!toggle) {
      document.getElementById('publish-post').classList.add('h-0', 'opacity-0', 'scale-0')
      document.getElementById('btn-publish').classList.add('hidden')
      document.getElementById('publish-post').classList.remove('h-60', 'opacity-100', 'scale-1')
    } else {
      document.getElementById('publish-post').classList.remove('h-0', 'opacity-0', 'scale-0')
      document.getElementById('publish-post').classList.add('h-60', 'opacity-100', 'scale-1')
      document.getElementById('btn-publish').classList.remove('hidden')
    }
  }

  const handleInput = (e) => {
    if(e.target.id === 'publish-content') {
      setPost({
        ...post,
        content: htmlEntities(e.target.value)
      })
    }
  }

  const handleSubmit = () => {
    let tempPost = {}
    if(!post.content && !post.img && !post.imgtemp) {
      alert('post vide')
    } else {
      async function awaitPost() {
        const result = await sendPost(htmlEntities(post.content), post.img)
        if(!result) {
          console.log(result)
        }
        else {
          tempPost = {
            postId: result.postId,
            userId: result.userId,
            msg: result.msg,
            img: post.imgtemp,
            User: {
              ...userInfo
            }
          }
          dispatch({
            type: 'NEWPOST',
            payload: tempPost
          })
          setPost({
            content: '',
            img: null,
            imgtemp: ''
          })
        }
      }
      awaitPost()
    }
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
    <form className='relative p-2 mt-4 ml-auto mr-auto bg-slate-800 flex flex-col space-y-2 w-11/12 rounded shadow-lg'>
       <label htmlFor='publish-post' className='font-medium text-slate-300'>Publier un nouveau statut</label>
        <div id='publish-post' className='scale-0 transition-all duration-200 opacity-0 h-0 flex flex-col space-y-2 w-full'>
          <textarea
          value={parseHtmlEntities(post.content)}
          onChange={handleInput} id='publish-content'
          className='p-2 h-60 rounded outline-none resize-none bg-slate-400'/>
          {post.imgtemp && <img src={post.imgtemp} className='h-10 object-cover'/>}
          <div id='btn-publish' className='hidden flex'>
            <label htmlFor='img' className='text-center transition-all duration-200 w-1/4 bg-slate-400 p-2 hover:bg-rose-400 cursor-pointer' aria-hidden="true"><i className="fas fa-images"></i><p className='hidden'>Image</p>
            <input type='file' className='w-0' id='img' accept='images/*' onChange={(e) => changeFile(e)}/></label>
            <button
            onClick={(e) => e.preventDefault(handleSubmit())}
            className='transition-all duration-200 w-3/4 bg-slate-200 p-2 hover:bg-emerald-400' type='submit'>Envoyer</button>
          </div>
        </div>
       <div className='absolute text-slate-300 -top-1 right-2 flex space-x-2'>
        <span onClick={handleToggle} className='p-1 hover:text-sky-400 rounded cursor-pointer'>{toggle ? <i className='fas fa-arrow-down' /> : <i className='fas fa-arrow-up' /> }</span>
       </div>

    </form>
  )
}
