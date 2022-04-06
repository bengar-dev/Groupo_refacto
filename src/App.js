import {Routes, Route} from 'react-router-dom'

import Login from './containers/Login'
import Register from './containers/Register'
import Forum from './containers/Forum'

function App() {

  const isAuth = localStorage.getItem('token')

  return (
    <>
      {isAuth ? 
        <Routes>
          <Route path='/' element={<Forum />} />
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/' element={<Register />} />
        </Routes>
      }
    </>
  );
}

export default App;
