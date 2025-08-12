 import {useState, useEffect} from 'react';
import Heading from '../Components/heading';
import Button from '../Components/button';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function MoneyRequests() {
    const [requests, setRequests] = useState([]);
    const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchRequests = async()=>{
        try{
           const response= await axios.get('http://localhost:3000/api/v1/account/requests',{
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
           })
              setRequests(response.data.requests);
        }catch (err){
            console.error('Error fetching requests:', err);
        }finally {
            setLoading(false);
        }
    }
    fetchRequests();
 },[]);

 const acceptRequest = async (requestId) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/account/Request-status', {
                requestId: requestId,
                status: 'Accepted'
        }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    
    
    )
    }catch (err) {
            console.error('Error accepting request:', err);
        }
 }
 const rejectRequest = async (requestId) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/account/Request-status', {
                requestId: requestId,
                status: 'Rejected'

        },
     {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    
    )
    }catch (err) {
            console.error('Error accepting request:', err);
        }
 }


    if (loading){
        return <div className="bg-white p-6 rounded-xl shadow-md mt-8 w-full max-w-3xl mx-auto">Loading...</div>
    }

    return(
        <div className=" flex justify-center items-center bg-grey-200 p-7 rounded-xl shadow-md mx-auto w-full max-w-3xl mt-8">
            <div className="bg-white margin-4 mx-auto width-2/3 h-3/4 p-6 rounded-xl  flex flex-col items-center justify-center">
            <Heading label={"Money Requests"} />
            {requests.length ===0 ? 
            <h5>No Money Requests</h5> :
            requests.map((req)=>{
                return(
                    <div key={req._id} className="flex flex-col justify-between items-center border-b py-2 ">
                        <div className="flex justify-between items-center w-full mb-2">
                        <h5>{
                            `${req.senderId.firstName} ${req.senderId.lastName} has requested ₹${req.amount}`
                        }</h5>
                        <p className="text-gray-500">
                    {new Date(req.date).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                  </p>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                     req.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                     req.status === 'accepted' ? 'bg-green-200 text-green-800' :
                     'bg-red-200 text-red-800'
                                }`}>
                      {req.status}
                    </span> </div>
                    <div className="flex >">
                  <Button label={"Accept"} className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => acceptRequest(req._id)} />
                    <Button label={"Reject"} className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => rejectRequest(req._id)} />
                        </div>
                    </div>
                )

            })

        } </div>

        </div>
    )
}












