import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Container, Jumbotron, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'
import { baseURL } from '../env'

export default function ViewQuestion(props) {

    const [pageData, setPageData] = useState([])
    const [question, setQuestion] = useState("Loading...")
    const [isvalidUser, setisValidUser] = useState(true)

    useEffect(() => {
        getAnswersById(props.match.params.id)
        getQuestion(props.match.params.id)
    }, [props.match.params.id])

    const getAnswersById = async (id) => {
        await Axios.get(
            `${baseURL}askme/get_answers/${localStorage.getItem('token')}/${id}/${localStorage.getItem('id')}/`
        ).then(
            e=>{
                setPageData(e.data)
            }
        ).catch(
            e => {
                setisValidUser(false)
            }
        )
    }

    const getQuestion = async (q_id) => {
        await Axios.get(
            `${baseURL}askme/get_question_by_id/${localStorage.getItem('token')}/${q_id}/${localStorage.getItem('id')}/`
        ).then(
            res => {
                setQuestion(res.data.question)
            }
        ).catch(
            err => {
                setQuestion({question: "Invalid Question ID"})
            }
        )
    }

    if (isvalidUser) {
        return (
            <Container className="mt-5">
                <Card>
                    <CardHeader style={{textAlign:"center"}}>
                        <h3 className="p-1">{question}</h3>
                    </CardHeader>
                    <CardBody>
                    <center className="p-4"><h4>Answers</h4></center>
                    <ListGroup>
                        {
                            pageData.map(
                                (element, key)=><ListGroupItem key={key}>
                                    <ListGroupItemHeading>
                                    {element.user_name}'s answer : 
                                    </ListGroupItemHeading> 
                                    {element.answer}
                                    <br/>
                                    ({element.date_created})
                                    <br/>
                                    <a href={`mailto:${element.user_email}`} className="btn btn-sm bg-warning btn-warning text-white mt-3 mb-2">Email {element.user_name}</a>
    
                                </ListGroupItem>
                            )
                        }
                    </ListGroup>
                    </CardBody>
                </Card>
            </Container>
        )
    } else {
        return <Container className="mt-5">
            <Jumbotron className="m-5">
                <h1>Oops!</h1>
                <h3>Only hosts can see their question details.</h3>
                <h5>To host a question <Link to="/">click here</Link></h5>
            </Jumbotron>
        </Container>
    }
    
}
