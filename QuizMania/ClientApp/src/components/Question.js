﻿import React, { Component } from 'react';
import { ButtonSection } from './ButtonSection'

export const Question = (props) => {

    const QuestionAnswer = () => {

        return <div>
                    <h3 className="main_question"><strong>{props.QuestionIndex + 1}/{props.QuestionLength}</strong>{props.Question.Name}</h3>
                    {
                        props.Question.Answers.map((ans, answerindex) => {
                            return (
                                <div key={props.Question.QID + ans.AID} className={"form-group radio_questions " + (ans.Selected ? "answer-selected" : "")}>
                                    <label key={ans.id} className="labelflex">
                                        {ans.Name}
                                        <input key={ans.id}
                                            checked={ans.Selected ? true : false}
                                            onChange={(e) => {
                                                !props.readonly ?
                                                    props.selectOneAnswer(props.QuestionIndex, answerindex) :
                                                    props.disableClick()
                                            }
                                            }
                                            name={"Group" + props.QuestionIndex}
                                            type="radio"
                                            defaultValue={ans.Name}
                                            className={"iradio_square-yellow icheck required"} />
                                        {
                                            props.showCorrectAnswers ?
                                                <i
                                                    className={ans.Selected && ans.AnsweredCorrectly && true ?
                                                        "icon-check-outline color-green" :
                                                        ans.Selected && !ans.AnsweredCorrectly ?
                                                            "icon-cancel-circle color-red" : ""}></i> : ""
                                        }
                                    </label>
                                </div>
                            );
                        })
                    }
                </div>
    }

    const ErrorSection = () => {
        return <div className="errorMessageContainer"><div className="errorMessage">{props.Question.Message}</div></div>;
    }

    const EmptySection = () => {
        return <div></div>;
    }

    return <div className="">
        {
            <div id="wizard_container">
                <input id="website" name="website" type="text" defaultValue />{/* Leave for security protection, read docs for details */}
                <div>
                    <div id="middle-wizard">
                        <div className="step">
                            <QuestionAnswer />
                            {props.Question.Message.length > 0 ? <ErrorSection /> : <EmptySection />}
                        </div>
                    </div>
                    {props.showNextPrevButtons ? < ButtonSection {...props} /> : ""}
                </div>
            </div>
        }
    </div>;

}