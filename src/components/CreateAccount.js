import Axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import { loginCtx } from '../contexts/LoginCtx';
import { baseURL } from '../env';

export default function CreateAccount() {
  const [password, setpassword] = useState({
    prevPassword : "",
    currentPassword : "",
  })
  const authState = useContext(loginCtx)
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
  })
  
  const createAccount = async (allow) => {
    const formData = new FormData()
    formData.append('name', credentials.name)
    formData.append('email', credentials.email)
    formData.append('password', password.currentPassword)

    await Axios.post(
      baseURL + "users/",
      formData
    ).then(
      e => {toast(
        "Successfully created an account.",
        {
          type :"success"
        }
      )
      if (!!e.data.token){
        console.log(e.data)
        localStorage.setItem('token', e.data.token)
        localStorage.setItem('name', e.data.user.name)
        localStorage.setItem('id', e.data.user.id)
        localStorage.setItem('email', e.data.user.email)
        authState.setIsLoggedIn(true)
      } else {
        toast("Provide valid credential or try " +
        "re-logging in", {
          type : "error",
          autoClose: "500",
          position: "bottom-center",
        })
        localStorage.clear()
      }
    }
    ).catch(
      e => {
        console.error(e)
        toast("Unable to create account", {type: "error"})
      }
    )
    
  }

  return (
        <Card className="mt-4">
        <CardTitle className="mt-4">
            <center style={{"fontWeight": "bold", "fontSize": "28px"}}>Create Account</center>
        </CardTitle>
    <CardBody>
  <Form>
  <FormGroup>
    <Label for="exampleEmail">Name</Label>
    <Input onChange={(e) => {
      setCredentials({...credentials, name : e.target.value})
    }} type="text" name="name" id="name" placeholder="Please enter your name" />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">Email</Label>
    <Input onChange={(e)=>{
        setCredentials({...credentials, email : e.target.value})
    }} type="email" name="email" id="Email" placeholder="example@email.com" />
  </FormGroup>
  <FormGroup>
    <Label>Password</Label>
    <Input onChange={
      (e)=>{
        setpassword({...password, prevPassword : e.target.value})
      }
    }    
    type="password" name="password" id="Password" placeholder="Password" />
  </FormGroup>
  <FormGroup>
    <Label>Confirm Password</Label>
    <Input onChange={
      (e)=>{
        setpassword({...password, currentPassword : e.target.value})
      }
    }    
    type="password" name="confirm-password" id="Password2" placeholder="Confirm Password" />
  </FormGroup>
  <Button onClick={()=>{
    if (password.currentPassword === password.prevPassword) {
      createAccount(password.currentPassword === password.prevPassword)
    } else {
      toast("Passwords do not match!", {type:"error"})
    }
  }}className="btn-block" type="button">Create Account</Button>
  </Form>
  </CardBody>
  </Card>
    )
}
