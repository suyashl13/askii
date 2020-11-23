import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Button, Col, Row } from 'reactstrap'
import CreateQuestions from '../components/CreateQuestions'
import QuestionList from '../components/QuestionList'

export default function HomePage() {
    const [isQuestionComp, setIsQuestionComp] = useState(true)

    if (!!!localStorage.getItem('token')) {
        return <Redirect to="/auth"/>
    } else {
        return <>
            <center className="jumbo-text">
                Hello, {localStorage.getItem('name')}
                <Row className="mt-4">
                    <Col>
                        <Button onClick={
                            ()=>{
                                setIsQuestionComp(true)
                            }
                        } className="btn-block">Hosted Questions</Button>
                    </Col>
                    <Col>
                        <Button onClick={
                            ()=>{
                                setIsQuestionComp(false)
                            }
                        } className="btn-block">Create Question</Button>
                    </Col>
                </Row>
                {
                    isQuestionComp ? <QuestionList/> : <CreateQuestions/>
                }
            </center>
        </>
    }
}
