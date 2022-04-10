import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default function Comment(props) {

  return (
    <div className='mt-4 bg-slate-800 flex flex-col rounded shadow'>
        <div className='p-1 flex items-center space-x-2'>
            <img src={props.author.avatar} className='w-8 h-8 object-cover rounded-full'/>
            <div className='flex flex-col w-full'>
                <h3 className='font-medium text-sm'><Link to={'/profil/' + props.author.id}>{props.author.firstname} {props.author.lastname}</Link></h3>
                <p className='font-light text-xs'>{moment(props.date).format('LLL')}</p>
            </div>
            <div className='p-2 flex space-x-2'>
              <button className='transition-all duration-200 w-6 h-6 rounded text-white bg-orange-500 hover:bg-orange-600 text-xs'><i className='fas fa-pen' /></button>
              <button className='transition-all duration-200 w-6 h-6 rounded text-white bg-red-500 hover:bg-red-600 text-xs'><i className='fas fa-trash' /></button>
            </div>
        </div>
        <p className='p-2 text-sm bg-slate-700'>
            {props.msg}
        </p>
    </div>
  )
}
