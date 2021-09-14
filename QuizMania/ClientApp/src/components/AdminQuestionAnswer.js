import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { AddQuestion, AddAnswer, LoadQuestions, LoadAnswers } from './Services';

export const AdminQuestionAnswer = () => {

    const [answermessage    , setanswermessage]     = useState('');
    const [questionmessage  , setquestionmessage]   = useState('');
    const [answer           , setanswer]            = useState('');
    const [question         , setquestion]          = useState('');

    const [questions        , setquestionlist]      = useState([]);
    const [answers          , setanswerlist]        = useState([]);

    const handlequestionchange = (e) => {
        setquestion(e.target.value);
    }

    const handleanswerchange = (e) => {
        setanswer(e.target.value);
    }

    const AddNewQuestion = () => {
        if (question.length == 0) {
            setquestionmessage('Required');
        }
        else {
            AddQuestion(question, setquestionlist);
            setquestionmessage('');
            setquestion('');
        }
    }

    const AddNewAnswer = () => {
        if (answer.length == 0) {
            setanswermessage('Required');
        }
        else {
            AddAnswer(answer, setanswerlist);
            setanswermessage('');
            setanswer('');
        }
    }

    useEffect(() => {
        LoadQuestions(setquestionlist);
        LoadAnswers  (setanswerlist);
    }, []);

    const AllQuestions = () => {
        return <div className="mt-3 scrollable">
            {
                questions.map((q, i) => {
                    return (
                        <div className="questionitem" key={i}>
                            <span className="mr-2">Q {i + 1}</span> <span >{q}</span>
                        </div>
                    );
                })
            }
        </div>;
    }

    const AllAnswers = () => {
        return <div className="mt-3 scrollable">
            {
                answers.map((q, i) => {
                    return (
                        <div className="questionitem" key={i}>
                            <span className="mr-2">Q {i + 1}</span> <span >{q}</span>
                        </div>
                    );
                })
            }
        </div>;
    }

    return <div className="adminquiz">
                <div className="textcenter">
                    <div className="text-danger small">{questionmessage}</div>
                    <div>
                        <textarea value={question} onChange={handlequestionchange} className="form-control" />
                    </div>
                    <button onClick={AddNewQuestion} className="button">Add Question</button>
                    <AllQuestions/>
                </div>
                <div className="textcenter">
                <div className="text-danger small" >{answermessage}</div>
                    <div>
                        <textarea value={answer} onChange={handleanswerchange} className="form-control" />
                    </div>
                    <button onClick={AddNewAnswer} className="button">Add Answer</button>
                    <AllAnswers />
                </div>
            </div>;
}