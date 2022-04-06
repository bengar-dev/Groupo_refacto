import React, {useState} from 'react'

export default function PublishPost() {

  const [toggle, setToggle] = useState(true)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <form className='relative p-2 mt-4 ml-auto mr-auto bg-slate-800 flex flex-col space-y-2 w-11/12 rounded shadow-lg'>
       <label htmlFor='publish-post' className='font-medium text-slate-300'>Publier un nouveau statut</label>
       {toggle && (
         <>
        <textarea id='publish-post' className='p-2 h-60 rounded outline-none resize-none'/>
        <button className='transition-all duration-200 w-full bg-slate-200 p-2 hover:bg-emerald-400' type='submit'>Envoyer</button>
         </>
       )}

       <div className='absolute -top-1 right-2 flex space-x-2'>
        <span onClick={handleToggle} className='p-1 hover:text-sky-400 rounded cursor-pointer'>{toggle ? <i className='fas fa-arrow-up' /> : <i className='fas fa-arrow-down' /> }</span>
        <span className='p-1 hover:text-emerald-400 rounded cursor-pointer'><i className='fas fa-image' /></span>
       </div>
    
    </form>
  )
}
