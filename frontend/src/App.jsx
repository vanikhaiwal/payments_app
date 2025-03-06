import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

function App() {
  const [Count,setCount ] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
