import Heading from '../Components/heading'
import {useState} from 'react'
import Button from '../Components/button'
import Input from '../Components/input'
import SubHeading from '../Components/subHeading'
import BottomText from '../Components/bottomText'
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    async function Authorize(username, password) {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                username: username,
                password: password
            });
            
        } catch {
            res.status(400).json({ message: "Incorrect inputs" })
        }

    }

    return (
        <div className="h-screen grid place-items-center bg-gray-500">
            <div className="bg-gray-300 h-3/4 w-80 content-center shadow-2xl">
                <Heading label={Login}></Heading>
                <SubHeading label={"Enter your information to Signin your"} sublabel={"account"} />
                <div className="ml-3">
                    <Input type={text} placeholder={"Enter Username / Email"} label={"Username"} onChange={(e) => setUsername(e.target.value)}></Input>
                    <Input type={text} placeholder={"Enter Password"} label={"Username"} onChange={(e) => setPassword(e.target.value)}></Input>
                    <Button label={"Signin"} onClick={() =>
                        Authorize(username, password)
                    }></Button>
                </div>
                <BottomText label={"Don't have an account?"} path={"/signup"} text={"Sign Up"}></BottomText>
            </div>
        </div>
    )

}