import React, { useState } from 'react';
import Heading from '../Components/heading.jsx';
import Input from '../Components/input.jsx';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../Components/button.jsx'; // make sure you import your button

const RequestMoney = () => {
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get('id');
  const name = searchParams.get('name') || 'User';
  const [amount, setAmount] = useState('');

  const handleRequest = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/account/requestMoney',
        {
         receiverId: receiverId,
          amount: parseFloat(amount),
          status: 'pending',
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      toast.success('Money request sent!');
    } catch (err) {
      toast.error('Failed to send request');
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center align-item-center  min-h-screen bg-gray-200 p-2 m-3 mx-auto">
      <div className="flex w-full h-3/4 max-w-md flex-col bg-white shadow-lg rounded-xl p-8">
        <Heading label={'Request Money'} />
        <div className="flex gap-4 flex-col items-left w-full">
            <div className='flex flex-row items-center gap-2 pt-10'>
          <div className="w-12 h-12 rounded-full bg-green-500 flex flex-row items-center justify-center">
            <span className="text-2xl text-white">{name[0]?.toUpperCase()}</span>
          </div>
          <h3 className="text-xl font-semibold">{name.toUpperCase()}</h3>
          </div>

          <Input
            label={'Enter Amount'}
            placeholder={'amount'}
            type={'number'}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button label={'Send Request'} onClick={handleRequest} />
        </div>
      </div>
    </div>
  );
};

export default RequestMoney;
