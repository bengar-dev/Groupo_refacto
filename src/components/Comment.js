import React from 'react'
import moment from 'moment'

export default function Comment(props) {

  return (
    <div className='mt-4 bg-slate-800 flex flex-col rounded shadow'>
        <div className='p-1 flex items-center space-x-2'>
            <img src={props.author.avatar} className='w-8 h-8 object-cover rounded-full'/>
            <div className='flex flex-col'>
                <h3 className='font-medium text-sm'>{props.author.firstname} {props.author.lastname}</h3>
                <p className='font-light text-xs'>{moment(props.date).format('LLL')}</p>
            </div>
        </div>
        <p className='p-2 text-sm bg-slate-700'>
            {props.msg}
        </p>
    </div>
  )
}
