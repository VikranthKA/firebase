import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import {useFirebase} from  "../context/Firebase"
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const firebase = useFirebase()

    const navigate = useNavigate()

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/")
        }
    },[firebase,navigate]
    )


    const handleSubmit =async(e)=>{
        e.preventDefault()
        const result = await firebase.loginInUserWithEamilAndPassword(email,password)
        setEmail("")
        setPassword("")
        console.log("Success",result)

    }

    return (
        <div className='container mt-5'>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
SignIn                </Button>
            </Form>
            <h1 className='mt-5 mb-5'>
                OR
            </h1>
            <Button onClick={firebase.signInWithGoogle}>
                Sign In with Google
            </Button>

        </div>
    )
}

export default Login
