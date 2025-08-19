import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Logout from './Components/Logout'
import Dashboard from './pages/Dashboard'
import TransactionHistory from './pages/TransactionHistory'
import  RequestMoney  from './pages/RequestMoney'
import MoneyRequests from './pages/MoneyRequests'
import { SendMoney } from './pages/SendMoney'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
          <Route path='/RequestMoney' element={<RequestMoney />} />
          <Route path='/requests' element={<MoneyRequests />} />
          <Route path='/logout' element={<Logout />} />
          
        </Routes>
      </BrowserRouter>
      <ToastContainer /> 
    </>
  )
}

export default App;


