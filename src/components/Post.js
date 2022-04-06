import React from 'react'

export default function Post(props) {
  return (
    <article className='bg-slate-600 rounded' id={props.id}>
      <div className='p-1 bg-slate-300 flex flex-col rounded'>
        <h2 className='text-sm font-medium'>Prénom Nom</h2>
        <span className='text-xs'>14/02/2022 - 20h40</span>
      </div>
      <p className='p-4 text-sm'>{props.msg}</p>
    </article>
  )
}
