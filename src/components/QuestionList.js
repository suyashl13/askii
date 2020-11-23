import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Toast, ToastBody, ToastHeader } from 'reactstrap'
import { baseURL, frontURL } from '../env'

export default function QuestionList() {
    const [userQuestions, setuserQuestions] = useState([])

    useEffect(() => {
        getUserQuestions();
    }, [])

    const getUserQuestions = async () => {
        console.log(baseURL + "askme/get_questions/" + localStorage.getItem('token') +"/" + localStorage.getItem('id') + "/")
        await Axios.get(
            baseURL + "askme/get_questions/" + localStorage.getItem('token') +"/" + localStorage.getItem('id') + "/"    
        ).then(
            res => {
                setuserQuestions(res.data)
            }
        ).catch(
            err=>console.error(err)
        )
    }


    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    const deleteQuestion = async (q_id) => {
        await Axios.delete(
            `${baseURL}askme/delete_question/${localStorage.getItem('token')}/${q_id}/${localStorage.getItem('id')}/`
        ).catch(e=>console.log(e))
    }

      return (
        <Card className="mt-5">
        <Container>
            <center className="m-5 text-info">
                <p>Have a look on questions you've hosted.</p>
            </center>
            <ListGroup flush>
                {
                    userQuestions.map(
                        (element, index) =>
                        <ListGroupItem key={index}>
                            <Row>
                                <Col className="col-10">
                                <ListGroupItemText style={{textAlign : "start"}}>
                                {element.question}</ListGroupItemText>
                                <ListGroupItemHeading style={{textAlign : "start"}}>
                                    <Badge color={element.answers===0 ? "danger" : "success"}>Answers : {element.answers}</Badge> <br/>
                                    <div className="mt-2">
                                        <Button onClick={
                                            ()=>{
                                                copyToClipboard(frontURL+`answer/${element.id}`);
                                            }
                                        } className="btn-sm">Copy Link</Button>
                                        <Button onClick={
                                            ()=>{toggle()}
                                        } className="btn-sm btn-danger m-1">Delete Question</Button>
                                        <Link className="btn btn-sm btn-primary" to={`answer/${element.id}`}>Visit Link</Link>
                                    <Toast style={{textAlign:"start", marginTop : "1rem"}} isOpen={show}>
                                    <ToastHeader>
                                        Are you sure want to delete this question ? 
                                    </ToastHeader>
                                    <ToastBody>
                                        {element.question} <br/><br/>
                                        <Button onClick={
                                            ()=>{
                                                // eslint-disable-next-line no-restricted-globals
                                                location.reload();
                                                deleteQuestion(element.id)
                                                getUserQuestions()
                                            }
                                        } className="btn-sm btn-danger">Delete</Button>
                                        <Button className="btn-sm ml-1">Cancel</Button>
                                    </ToastBody>
                                    </Toast>
                                    </div>
                                </ListGroupItemHeading>
                                </Col>
                                <Col className="col-md-2 col-sm-6">
                                    <Link to={"/question_info/"+element.id} className="btn btn-dark btn-block">
                                        Question details
                                    </Link>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )
                }
            </ListGroup>
        </Container>
        </Card>
    )
}
