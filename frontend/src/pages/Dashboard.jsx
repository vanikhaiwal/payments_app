import React from 'react';
import AppBar from '../Components/AppBar'
import Balance from '../Components/Balance'
import Users from '../Components/user'
import Button from '../Components/button'
import { useNavigate } from 'react-router-dom'
import QuickActions from '../Components/QuickActions';


function Dashboard(){
    const navigate = useNavigate();
    return(

        <div className="flex flex-col items-center h-[100vh] bg-gray-200 m-0 p-0">
        <div className="w-full h-1/7 mx-auto  bg-white shadow-md rounded-lg p-1">
        <AppBar/>
        </div>

        <div className="flex flex-row items-center justify-center w-full h-3/7 mt-2 ">
        <div className=" w-2/6 h-[90%] bg-white rounded-xl m-3 ml-auto shadow-md">
        <Balance amount={10000} user={"Vani Khaiwal"}/>
        </div>
        <div className="flex flex-row w-2/6 h-[90%] bg-white rounded-xl m-2 mr-auto shadow-md"> 
        <QuickActions />
        </div>
        {/* <div className=" flex flex-row w-2/6 h-[90%] bg-white rounded-xl m-2 mr-auto shadow-md"> 
        <Button label={"Transaction History"} onClick={() => navigate('/transaction-history')} />
        <Button label={'Money Requests'} onClick={() => navigate('/requests')} />
        </div> */}
        </div>
        <div className="w-2/3 h-[60vh] bg-white rounded-xl shadow-md mt-2 p-2">
        <Users/>
        </div>
        </div>
        
);}
export default Dashboard;
