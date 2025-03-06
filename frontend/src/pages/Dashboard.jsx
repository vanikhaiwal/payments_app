import Heading from '../components/heading'
import axios from 'axios'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import user from '../data/user'

function Dashboard(){
    return(
        <>
        <AppBar/>
        <Balance amount={10000}/>
        <Users/>
        </>
)}
export default Dashboard
