﻿import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { LoadAnswers, LoadQuestions, SaveQuiz } from './Services'

let ddAnsSelected = React.createRef();
let ddQuestionSelected = React.createRef();

const AddQuestion = (props) => {

    return <div className="text-center">
        <select className="form-control"
            ref={ddQuestionSelected}
            onChange={(e) => { ddQuestionSelected.current.value = e.target.value }}>
            {
                props.questions.map(q => {
                    return <option value={q.id}>{q.name}</option>
                })
            }
        </select>
    </div>;
}

const AddAnswer = (props) => {

    var ansID = ddAnsSelected.current.value;
    var answerExists = props.selectedanswers.filter(a => { return a.id == ansID });

    if (answerExists.length == 0) {

        var answer = props.answers.filter(a => { return a.id == ansID });
        var newselectedanswers = [...props.selectedanswers];
        newselectedanswers.push({ id: answer[0].id, name: answer[0].name });
        props.setselectedanswers(newselectedanswers);
    }
}

const SelectAnswer = (props) => {

    return <div className="text-center">
        <select className="form-control"
            ref={ddAnsSelected}            onChange={(e) => { ddAnsSelected.current.value = e.target.value }} >            {
                props.answers.map(a => {
                    return <option value={a.id}>{a.name}</option>
                })
            }
        </select>
        <div className="text-right">
            <button className="button" onClick={() => { AddAnswer(props) }}>Add</button>
        </div>
    </div>;
}

const SelectedAnswers = (props) => {

    return <div className="text-center">
        {
            props.selectedanswers.map((ans, answerindex) => {
                return (
                    <div className="quizansweritem" key={answerindex}>
                        <span className="mr-2">A-{answerindex + 1})</span>
                        <label key={ans.id} className="">
                            {ans.name}
                        </label>
                    </div>
                );
            })
        }
    </div>

}

const AddQAToQuiz = (props) => {

    var qID = ddQuestionSelected.current.value;
    var questionExists = props.questionanswers.filter(q => { return q.id == qID });
    if (questionExists.length == 0) {
        var question = props.questions.filter(q => { return q.id == qID });
        var newquestionanswers = [...props.questionanswers];
        newquestionanswers.push({ id: question[0].id, name: question[0].name, answers: props.selectedanswers });
        props.setquestionanswers(newquestionanswers);
    }
}

const AddToQuiz = (props) => {

    return <div className="text-center mt-3">
        <button className="button button-primary" onClick={(e) => AddQAToQuiz(props)} >Add To Quiz</button>
    </div>;
}

const SaveCurrentQuiz = (props) => {
    
    console.log(SaveQuiz(props));
}

const QuizQuestionAnswers = (props) => {

    return <div className="text-center">
        {
            props.questionanswers.map((q, i) => {
                return (
                    <div key={i} className="mt-3">
                        <div className="quizansweritem" >
                            <span className="mr-2">Q-{i + 1})</span>
                            <label key={q.id} className="labelflex">
                                {q.name}
                            </label>
                        </div>
                        {
                            q.answers.map((a, ai) => {
                                return <div key={ai} className="quizansweritem ml-2">
                                        <span className="ml-2">A-{ai + 1})</span>
                                        <div className="ml-2" key={a.id}>{a.name}</div>
                                    </div>
                            })
                        }
                    </div>
                );
            })
        }

    </div>
}

const AddButton = (props) => {

    return <div className="mt-2 text-center">
        <button className="button" onClick={(e) => SaveCurrentQuiz(props.questionanswers)}>Save Quiz</button>
            </div>;
}

export const AdminQuiz = () => {

    //question list
    const [questions, setquestions] = useState([]);
    //answer list
    const [answers, setanswers] = useState([]);

    const [selectedquestion, setselectedquestion] = useState({ id: 0, name: '' });
    //answers for that question
    const [selectedanswers, setselectedanswers] = useState([]);
    //quiz question answers
    const [questionanswers, setquestionanswers] = useState([]);

    useEffect(() => {
        LoadQuestions(setquestions);
        LoadAnswers(setanswers);
    }, []);

    return <div>
            <AddQuestion questions={questions} />
            <div className="quiz-answer-area">
                <SelectAnswer answers={answers} selectedanswers={selectedanswers} setselectedanswers={setselectedanswers} />
                <SelectedAnswers selectedanswers={selectedanswers} />
            </div>
            <AddToQuiz
                setselectedquestion={setselectedquestion}
                selectedquestion={selectedquestion}
                selectedanswers={selectedanswers}
                questions={questions}
                setquestionanswers={setquestionanswers}
                questionanswers={questionanswers}  />
                <QuizQuestionAnswers questionanswers={questionanswers} />
                <AddButton questionanswers={questionanswers} />
        </div>;
}
