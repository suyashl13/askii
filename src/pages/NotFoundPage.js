import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Jumbotron } from 'reactstrap'

export default function NotFoundPage() {
    return (
        <Container className="mt-5">
        <Jumbotron className="m-5">
            <h1>404</h1>
            <h3>You`re lost in your own questions...</h3>
            <h5>Go to <Link to="/">Home</Link></h5>
        </Jumbotron>
    </Container>
    )
}
