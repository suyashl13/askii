import Axios from 'axios';
import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav} from 'reactstrap';
import { loginCtx } from '../contexts/LoginCtx';
import { baseURL } from '../env';

export default function MNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const loginctx = useContext(loginCtx)

    const logout = async (id)=> {
      
      await Axios.get(
        baseURL + 'users/signout/' + id + "/"
      ).then(
        e=>console.log(e.data)
      ).catch(
        err=>console.error(err)
      )
    }

    return (
        <Navbar className="navbar-dark bg-secondary" color="faded" light expand="md">
        <NavbarBrand color="info" href="/">Answer.My.Question</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            
          </Nav>
          {
            !!localStorage.getItem('token') ? <Link to="/auth" className="btn btn-secondary bg-secondary"
            onClick={
              ()=>{
                loginctx.setIsLoggedIn(false)
                console.log(localStorage.getItem('id'))
                logout(localStorage.getItem('id'))
                localStorage.clear()
                return <Redirect to="/auth" />
              }
            }>Logout</Link> : null
          }
        </Collapse>
      </Navbar>
    )
}
