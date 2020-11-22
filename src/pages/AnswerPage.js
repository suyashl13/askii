import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Container, Input, Jumbotron } from 'reactstrap'
import { baseURL } from '../env';

export default function AnswerPage(props) {
    const ref = React.createRef();
    const [answer, setAnswer] = useState("Loading...")
    const [question, setQuestion] = useState({})
    const [isAnswered, setIsAnswered] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        getQuestion(props.match.params.id)
    }, [])

    const getQuestion = async (q_id) => {
        await Axios.get(
            `${baseURL}askme/get_question_by_id/${localStorage.getItem('token')}/${q_id}/${localStorage.getItem('id')}/`
        ).then(
            res => {
                setQuestion(res.data)
            }
        ).catch(
            err => {
                setQuestion({question: "Invalid Question ID"})
                setIsDisabled(true)
                console.error(err)
            }
        )
    }

    const answerQuest = async (q_id) => {
        const formData = new FormData()
        formData.append('answer',answer)
        await Axios.post(
            `${baseURL}askme/answer_question/${localStorage.getItem('token')}/${q_id}/${localStorage.getItem('id')}/`,
            formData
        ).then(
            res => {
                setIsAnswered(true)
            }
        ).catch(
            err => {
                alert("Answer cannot be smaller than 8 characters.");
                console.error(err)
            }
        )
    }

    if (!!localStorage.getItem('token')) {
        // isAuthenticated
        if (!isAnswered) {
            return <Card className="m-5">
            <Container className="p-4">
                <center className={"p-4 " + isDisabled ? "text-muted" : ""}><h3>Answer a question.</h3></center>
                <p className={isDisabled ? "text-danger" : "text-primary"}
                style={{

                    margin:"1rem",
                    textAlign:"center",
                    fontSize : "20px"
                }}>{question.question}</p>
                <Input ref={ref} 
                disabled={isDisabled}
                onChange={
                    (event)=>{
                        setAnswer(event.target.value);
                    }
                } placeholder="Your answer here..." className=" mb-4" type="textarea"></Input>
                <Button disabled={isDisabled}
                 onClick={
                    ()=>{
                        answerQuest(props.match.params.id)
                        console.log(ref)
                    }
                } className="btn-block">Post Answer</Button>
            </Container>
        </Card>
        } else {
            return <Container className="mt-5">
            <Jumbotron className="m-5">
                <h1>Yay! You just answered a question !!</h1>
                <h3>Thank you for your contribution</h3>
                <Link to="/" className="btn-dark btn">Go to Home</Link>
            </Jumbotron>
        </Container>
        }
    } else {
        return <Container className="mt-5">
            <Jumbotron className="m-5">
                <h1>Oops!</h1>
                <h3>To answer any question you need to <Link to="/auth">Login</Link> first.</h3>
            </Jumbotron>
        </Container>
    }
}
