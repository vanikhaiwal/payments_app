import react from 'react';
import {useEffect,useState} from 'react';
import {useNavigate }from 'react-router-dom';
import jwtDecode from "jwt-decode";

const Logout =()=>{
useEffect(()=>{
    const token=localStorage.getItem('token');
    const decoded = jwtDecode(token);
    localStorage.setItem('expiry', decoded.exp * 1000);
    const expiry=localStorage.getItem('expiry');
    if(!expiry){
        return;
    }
    const now= Date.now;
    const timeout=expiry-now;
    if(timeout<0){
        handleLogout();
    }else {
        const timer = setTimeout(()=>{
            toast.error("Session Expired! Please login again.")
            handleLogout();
        },timeout);
        return ()=> clearTimeout(timer);
    }
},[])    

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
  toast.success("Logout successful");
  navigate('/login'); 
};
}