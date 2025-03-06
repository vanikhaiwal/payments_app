import  Heading  from '../Components/heading'
import  {useState}  from 'react'
import  Button  from '../Components/button'
import   Input  from '../Components/input'
import SubHeading  from '../Components/subHeading'
import  BottomText  from '../Components/bottomText'
import axios from 'axios'

import { useSearchParams } from 'react-router-dom'
 export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="h-screen grid place-items-center bg-gray-500">
            <div className="bg-gray-300 h-3/4 w-80 content-center shadow-2xl">
                <Heading label={"Sign Up"} />
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
                            setEmail(e.target.value)
                        }} />
                    <Input label={"Password"} type={"password"} placeholder={"Enter your password"}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <Button label={"Sign Up"}
                        onClick={async () => {
                            const response = await axios.post('http://localhost:3000/api/v1/user/signup',
                                {
                                    firstName,
                                    lastName,
                                    email,
                                    password
                                })
                                localStorage.setItem('token',response.data.token)
                            
                        }} />
                        </div>
                    <BottomText label={"Already have an account?"} path={"/login"} text={"Login"} />
                </div>
                </div>
                )}

