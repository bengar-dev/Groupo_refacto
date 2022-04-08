import {Routes, Route} from 'react-router-dom'

import Login from './containers/Login'
import Register from './containers/Register'
import Header from './components/Header'
import Forum from './containers/Forum'
import Profil from './containers/Profil'

function App() {

  const isAuth = localStorage.getItem('token')

  return (
    <>
      {isAuth ?
      <>
        <Header /> 
        <Routes>
          <Route path='/' element={<Forum />} />
          <Route path='/profil/:id' element={<Profil />} />
        </Routes>
        </>
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
