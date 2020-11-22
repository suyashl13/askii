import Axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import { loginCtx } from '../contexts/LoginCtx';
import { baseURL } from '../env';

export default function LoginInAccount() {
    const [credentials, setCredentials] = useState({email : "", password : ""})
    const authState = useContext(loginCtx)

    const performLogin = async () => {
        const formData = new FormData();
        formData.append('email', credentials.email)
        formData.append('password', credentials.password)
        await Axios.post(
            baseURL + "users/signin/",
            formData
          ).catch(e=> {
            localStorage.clear()
            console.error(e)
          })
          .then(e => {
              if (!!e.data.token) {
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
          )
    }

    const setEmail = (e) => {
      setCredentials({...credentials, "email" : e.target.value})
    }
    const setPassword = (e) => {
      setCredentials({...credentials, "password" : e.target.value})
    }

    return (
        <Card className="mt-4">
        <CardTitle className="mt-4">
            <center style={{"fontWeight": "bold", "fontSize": "28px"}}>Login</center>
        </CardTitle>
        <CardBody>
      <Form>
      <FormGroup>
      <Label for="Email">Email</Label>
      <Input onChange={(e)=>{
        setEmail(e)
      }} type="email" name="email" id="Email" placeholder="example@email.com" />
      </FormGroup>
      <FormGroup>
      <Label>Password</Label>
      <Input type="password" onChange={(e)=>setPassword(e)} name="password" id="examplePassword" placeholder="Password" />
      </FormGroup>
      <Button className="btn-block" onClick={()=>performLogin()} type="button">Login</Button>
      </Form>
      </CardBody>
      </Card>
    )
}
