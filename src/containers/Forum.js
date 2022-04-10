import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Post from '../components/Post'
import PublishPost from '../components/PublishPost'
import { parseHtmlEntities } from '../functions/htmlentities'

import { getPosts } from '../services/posts'
import {getComments} from '../services/cmts'

export default function Forum() {

  const dispatch = useDispatch()

  const {postsArray, cmtsArray} = useSelector(state => ({
    ...state.postReducer,
    ...state.cmtReducer
  }))

  useEffect(() => {
    async function getPublications() {
      const result = await getPosts()
      if(!result) {
        console.log('erreur')
      }
      else {
        dispatch({
          type: 'GETPOST',
          payload: result
        })
      }
    }
    async function awaitComments() {
      const result = await getComments()
      if(!result) {
        console.log('erreur')
      } else {
        dispatch({
          type: 'GETCMT',
          payload: result
        })
      }
    }
    getPublications()
    awaitComments()
  }, [])

  return (
    <div className='h-screen bg-slate-900 pt-20'>
      <PublishPost />
      {postsArray.length > 0 ? <section id='publications' className='mt-4 p-2 flex flex-col space-y-10 bg-slate-800'>
        {postsArray.map(item =>
          <Post
          key={item.postId}
          id={item.postId}
          date={item.postedat}
          author={item.User}
          img={item.img}
          likes={item.countLike}
          msg={parseHtmlEntities(item.msg)}
          />
        )}
      </section> : <section id='publications' className='mt-10 p-2 flex flex-col space-y-2 bg-slate-800'>
        <p className='font-medium text-slate-300 text-center'>Aucune publication</p>
        </section>}
    </div>
  )
}
