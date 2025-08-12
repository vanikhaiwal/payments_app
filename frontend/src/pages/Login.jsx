import Heading from  '../Components/heading'
import {useState} from 'react'
import Button from '../Components/button'
import Input from '../Components/input'
import SubHeading from '../Components/subHeading'
import BottomText from '../Components/bottomText'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
     const navigate = useNavigate();
    async function Authorize(username, password) {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            toast.success("Login Successful!");
            navigate('/dashboard');
        } catch(err) {
           console.log(err);
        }

    }

    return (
        <div className="h-screen grid place-items-center bg-gray-500">
            <div className="bg-gray-300 h-3/5 w-80 flex flex-col justify-center items-center shadow-2xl rounded">
                <Heading label={"SIGN IN"} />
                <SubHeading label={"Enter your information to Signin your"} sublabel={"account"} />
                <div className="ml-3">
                    <Input type={"text"} placeholder={"Enter Username / Email"} label={"Username"} onChange={(e) => setUsername(e.target.value)} />
                    <Input type={"password"} placeholder={"Enter Password"} label={"Password"} onChange={(e) => setPassword(e.target.value)} />
                    <Button label={"SIGN IN"} onClick={() =>
                        Authorize(username, password)
                    } />
                </div>
                <BottomText label={"Don't have an account?"} path={"/signup"} text={"Sign Up"} />
            </div>
        </div>
    )

}