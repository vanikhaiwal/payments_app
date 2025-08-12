import {useState, useEffect} from 'react';
import axios from 'axios';
import Heading from '../Components/heading';
import SubHeading from '../Components/subHeading';


const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchtransaction= async () =>{
            try{
                const response = await axios.get('http://localhost:3000/api/v1/account/transactionhistory', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }});
                setTransactions(response.data.transactions);
            } catch(err){
                console.error('Error fetching transaction history:', err);
            } finally {
        setLoading(false);
      }
         }
         fetchtransaction();
        },[]);
        
    if (loading) {
        return <div className="bg-white p-6 rounded-xl shadow-md mt-8 w-full max-w-3xl mx-auto">Loading...</div>;
    }

        return (
            <div className="bg-white p-6 rounded-xl shadow-md mt-8 w-full max-w-3xl mx-auto">
            <Heading label={"Transaction History"} />
           {transactions.length === 0 ?
           (<SubHeading label={"No transactions found."} sublabel={""} />) :
           (
            transactions.map((maps)=>{
            const isSender = maps.senderId._id === JSON.parse(atob(token.split('.')[1])).id;
            return(
                <div key={maps._id}>
                <h5  className="flex justify-between item-center pb-2 border-b ">
                     {isSender ? 'Sent to' : 'Received from'}{' '}
                    {isSender
                      ? `${maps.receiverId.firstName || 'Unknown'} `
                      : `${maps.senderId.firstName || 'Unknown'} `}
                </h5>
                 <p className="text-gray-500">
                    {new Date(maps.date).toLocaleString()}
                  </p>
                  <p className={`font-bold text-medium ${isSender ? 'text-red-500' : 'text-green-600'}`}>
                  ₹{maps.amount}
                </p>
                </div>
            );
           })
 
        )}
            </div>
        )
    };
    export default TransactionHistory;