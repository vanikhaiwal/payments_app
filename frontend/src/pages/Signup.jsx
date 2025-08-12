import Heading from '../Components/heading'
import  {useState}  from 'react'
import  Button  from '../Components/button'
import   Input  from '../Components/input'
import SubHeading  from '../Components/subHeading'
import  BottomText  from '../Components/bottomText'
import axios from 'axios'
 import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useNavigate } from 'react-router-dom'


 export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    return (
        <div className="h-screen grid place-items-center bg-gray-300">
            <div className="bg-white h-3/4 w-100 flex justify-center items-center flex-col shadow-2xl rounded">
                <Heading label={"SIGN UP"} />
                <SubHeading label={"Enter your information to make an"} sublabel={"account"} />
                <div className="ml-3">
                    <Input label={"First Name"} type={"text"} placeholder={"Enter your name"}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }} />
                    <Input label={"Last Name"} type={"text"} placeholder={"Enter your name"}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }} />
                    <Input label={"Email"} type={"email"} placeholder={"Enter your email"}
                        onChange={(e) => {
                            setemail(e.target.value)
                        }} />
                    <Input label={"Password"} type={"password"} placeholder={"Enter your password"}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <Button label={"Sign Up"}
                        onClick={async () => {
                            try {
                                const response = await axios.post('http://localhost:3000/api/v1/user/signup',
                                    {
                                        firstName,
                                        lastName,
                                        username: email, // Changed from 'email' to 'username'
                                        password
                                    })
                                localStorage.setItem('token', response.data.token)
                                console.log(response.data)
                                toast.success("Signup Successful!");
                                navigate('/dashboard');

                            } catch (err) {
                                console.log("signup error", err)
                            }
                        }} />
                        </div>
                    <BottomText label={"Already have an account?"} path={"/login"} text={"Login"} />
                </div>
                </div>
               
                )};

            