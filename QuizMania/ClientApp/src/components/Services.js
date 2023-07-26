import { createContext, useEffect, useState, Component } from "react";
import axios from 'axios';
import { Question } from "./Question";

export const LoadQuizToEdit = (quizid, setquestionanswers) => {

    if (quizid > 0) {
        let questions = [];
        fetch(`quiz`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ quizid: quizid }),
        })
            .then((response) => response.json())
            .then((data) => {
                for (var i = 0; i < data.questions.length; i++) {
                    let question = { id: data.questions[i].qid, name: data.questions[i].name, answers: [] };
                    for (var j = 0; j < data.questions[i].answers.length; j++) {
                        question.answers.push({
                            id: data.questions[i].answers[j].aid,
                            name: data.questions[i].answers[j].name,
                            iscorrect: data.questions[i].answers[j].answeredCorrectly
                        });
                    }
                    questions.push(question);
                }
                setquestionanswers(questions);
            });
    }
}

export const LoadQuiz = (quizid, func) => {
    let Questions = [];
    fetch(`quiz`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ quizid : quizid }),
    })
        .then((response) => response.json())
        .then((data) => {
            for (var i = 0; i < data.questions.length; i++) {
                let question = { QID: data.questions[i].qid, Name: data.questions[i].name, Answers: [], Active: true, Message: '' };
                for (var j = 0; j < data.questions[i].answers.length; j++) {
                    question.Answers.push({
                        AID: data.questions[i].answers[j].aid,
                        Name: data.questions[i].answers[j].name,
                        AnsweredCorrectly: data.questions[i].answers[j].answeredCorrectly,
                        Selected: false
                    });
                }
                Questions.push(question);
            }
            func(Questions);
        });
}

export const saveAndSubmitQuiz = (quizid,questionlist) => {

    fetch('quiz/submitquiz', {
        method: 'POST',
        body: JSON.stringify({
            quizid: quizid,
            questionlist: questionlist
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res =>  res);
}

export const AddQuestion = (question, func) => {

    fetch('quiz/addquestion', {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => LoadQuestions(func));
}

export const AddAnswer = (answer, func) => {

    fetch('quiz/addanswer', {
        method: 'POST',
        body: JSON.stringify({ answer }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => LoadAnswers(func));
}

export const LoadQuestions = (func) => {
    let Questions = [];
    fetch(`quiz/questions`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            for (var i = 0; i < data.length; i++) {
                Questions.push({ id: data[i].id, name: data[i].name });
            }
            //console.log(Questions);
            func(Questions);

        });
}

export const LoadAnswers = (func) => {
    let Answers = [];
    fetch(`quiz/answers`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            for (var i = 0; i < data.length; i++) {
                Answers.push({ id: data[i].id, name: data[i].name });
            }
            func(Answers);
        });
}

export async function LoadQuizes(func)  {
     
    fetch(`quiz/quizes`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        func(data);
    });
}

export async function EditAnswer(id, name) {

    return await fetch(`quiz/editanswer`, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            name: name
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });

}

export async function EditQuestion(id, name) {

    return await fetch(`quiz/editquestion`, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            name: name
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            //console.log("1 " + data.message);
            //func({ index: -1, message: data.message });
            //if (!data.errored)
            //    LoadQuestions(funcQues);
            return data;
        });
}

export async function SaveQuiz(id, name, questionanswers,currpage) {

    return await fetch(`quiz/savequiz`, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            quizname: name,
            questionanswers: questionanswers
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            //return data;
            //navigate back to admin quiz page
            currpage.push('/adminquizlist');
        });
}

export const LoginUser = async (name, pwd) => {

    return await fetch(`user/login`, {
        method: 'POST',
        body: JSON.stringify({
            name: name
            /*password: pwd*/
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok)
                return response.json();
            else {
                //console.log(response);
                throw Error(response);
            }
        })

}
