import Axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Input, Jumbotron } from 'reactstrap'
import { baseURL, frontURL } from '../env'

export default function CreateQuestions() {
    
    const [question, setquestion] = useState("")
    const [response, setResponse] = useState(null)

    const postQuestion =  async (question) => {
        const formData = new FormData();
        formData.append('question', question)
        await Axios.post(
            baseURL + `askme/create_question/${localStorage.getItem('token')}/${localStorage.getItem('id')}/`,
            formData
        ).then(
            e=>{
                setResponse(e.data)
            }
        ).catch(
            e=>{
                alert("Question should be greater than 6 characters.")
            }
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
    
    return (
        <Card className="mt-5">
            {
                !!!response ? <Container>
                <p style={{
                    paddingTop: "1rem"
                }}>Hello, {localStorage.getItem('name')}</p>
                <Input onChange={
                    (e)=>{
                        setquestion(e.target.value)
                    }
                } type="textarea" name="text" placeholder="Write your question here..." />
                <Button onClick={
                    ()=>{
                        postQuestion(question)
                    }
                } className="btn-block mt-4 mb-4">Create Question</Button>
            </Container>
             : <Jumbotron className="m-5">
                <h1>Yeeepie!!</h1>
                <h3>You just created a question it will be available <br/>
                <Link to={`answer/${response.id}`} className="btn btn-md m-2 btn-primary">Here</Link>
                <Button onClick={
                    ()=>{
                        copyToClipboard(`${frontURL}answer/${response.id}`)
                    }
                }>Copy Link</Button>
                </h3>
            </Jumbotron>
            }
        </Card>
    )
}
