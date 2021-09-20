import React, { Component } from 'react';
import { Question } from './Question';
import { ButtonSection } from './ButtonSection'

export const EOFQuiz = (props) => {

    return <div>
                <div className="text-center mt-4">
                     <div className="displayflex">
                        <span className="pe-7s-alarm font-size-40 mr-2"></span><h4>You have completed the Quiz</h4>
                     </div>
                <h4>Your score is <span className="score-label">{props.calculateScore()}%</span></h4>
                </div>
                {
                    props.Questions.map(function (q, i) {
                        return <Question
                                    readonly={true}
                                    disableClick={props.disableClick}
                                    showCorrectAnswers={true}
                                    showNextPrevButtons={false}
                                    currentquestionindex={q.currentquestionindex}
                                    moveToPreviousQuestion={q.moveToPreviousQuestion}
                                    moveToNextQuestion={q.moveToNextQuestion}
                                    selectOneAnswer={q.selectOneAnswer}
                                    key={i}
                                    QuestionIndex={i}
                                    QuestionLength={props.Questions.length}
                                    Question={q} />
                    })
                }
                <div className="text-center">
                    <ButtonSection {...props} LastPage={true} />
                </div>
            </div>
}
