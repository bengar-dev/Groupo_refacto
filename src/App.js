import {Routes, Route} from 'react-router-dom'

import Login from './containers/Login'
import Register from './containers/Register'
import Header from './components/Header'
import Forum from './containers/Forum'
import Profil from './containers/Profil'
import EditProfil from './containers/EditProfil'

function App() {

  const isAuth = localStorage.getItem('token')

  return (
    <>
      {isAuth ?
      <div className='bg-slate-900 flex flex-col items-center'>
        <Header /> 
        <Routes>
          <Route path='/' element={<Forum />} />
          <Route path='/profil/:id' element={<Profil />} />
          <Route path='/editprofil' element={<EditProfil />} />
        </Routes>
        </div>
        :
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      }
    </>
  );
}

export default App;
