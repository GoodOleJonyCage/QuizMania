﻿import React  from 'react';
import { Question } from './Question';
import { EOFQuiz } from './EOFQuiz'
//import { ProgressBar } from 'react-bootstrap';
import Progressbar   from './Progress_bar'
import 'bootstrap/dist/css/bootstrap.min.css';

export const QuestionContainer = (props) => {

    const ProgressBarHtml = () => {
        const percentComplete = props.getPercentCompleted();
           //return <ProgressBar className="progressbar" animated now={percentComplete} label={`${percentComplete}% finished`} />;
        return <Progressbar bgcolor="orange" progress={percentComplete}  height={50} />
    }

    const QuestionList = () => {

        return <div className="wizard-branch wizard-wrapper">
            <div className="step wizard-step current" >
                <ProgressBarHtml />
                {
                    props.currentquestionindex == props.Questions.length ? <EOFQuiz {...props} /> :
                        props.Questions.map(function (q, i) {
                            return props.currentquestionindex == i ?
                                <Question
                                    readonly={false}
                                    disableClick={props.disableClick}
                                    calculateScore={props.calculateScore}
                                    showNextPrevButtons={true}
                                    currentquestionindex={props.currentquestionindex}
                                    moveToPreviousQuestion={props.moveToPreviousQuestion}
                                    moveToNextQuestion={props.moveToNextQuestion}
                                    selectOneAnswer={props.selectOneAnswer}
                                    key={i}
                                    QuestionIndex={i}
                                    QuestionLength={props.Questions.length}
                                    Question={q} /> : ""
                        })
                }
            </div>
        </div>
    }

    return (
        <QuestionList currentquestionindex={props.currentquestionindex} />
    );
}