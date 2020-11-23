import React, {useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Container, Row } from 'reactstrap';
import CreateAccount from '../components/CreateAccount';
import LoginInAccount from '../components/LoginInAccount';
import { loginCtx } from '../contexts/LoginCtx';

export default function AuthenticationPage() {
  const [isLoginPage, setisLoginPage] = useState(true)
  const authState = useContext(loginCtx)

  useEffect(() => {
    if (authState.isLoggedIn) {
      return <Redirect to="/"/>
    }
  },[authState.isLoggedIn])

  if (localStorage.getItem('token')) {
    return <Redirect to="/"/>
  }

  return <Container className="login-form">
  <ToastContainer/>
    <center style={{
        "fontSize" : "2rem",
        "padding" : "2rem"
    }}>Lets get started...<br/></center>
    <center>
        <Row>
          <Col className="col-6"><Button onClick={()=>{setisLoginPage(true)}} className="btn-block" >Login</Button></Col>
          <Col className="col-6"><Button onClick={()=>{setisLoginPage(false)}} className="btn-block">Signup</Button></Col>
        </Row>
    </center>
  <br/>
  {
    isLoginPage ? <LoginInAccount/> : <CreateAccount />
  }
  </Container>
}
