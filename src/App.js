import {Routes, Route} from 'react-router-dom'

import Login from './containers/Login'
import Register from './containers/Register'
import Header from './components/Header'
import Forum from './containers/Forum'

function App() {

  const isAuth = localStorage.getItem('token')

  return (
    <>
      {isAuth ?
      <>
        <Header /> 
        <Routes>
          <Route path='/' element={<Forum />} />
        </Routes>
        </>
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
