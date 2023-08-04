//import { createContext, useEffect, useState, Component } from "react";
//import axios from 'axios';

import { userNameStore } from './userNameStore'

let { getJwtToken, getUsername } = userNameStore();

export const LoadQuizToEdit = async  (quizid,/* setquestionanswers*/) => {

    if (quizid > 0) {

        let questions = [];
        let response = await fetch(`quiz/quizdetails`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + getJwtToken()
            },
            method: 'POST',
            body: JSON.stringify({ quizid: quizid }),
        });


        if (response.ok) {

            const data = await response.json();
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
            return questions;
        }

        throw response;
    }
}

export const LoadQuiz = async (quizid/*, func*/) => {

    let Questions = [];
    let response = await fetch(`quiz/quizdetails`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({ quizid: quizid }),
    });

    if (response.ok) {
        const data = await response.json();
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
        //func(Questions);
        return Questions;
    }
    else
        throw response;
        
}

export const saveAndSubmitQuiz = async (quizid,questionlist) => {

    let response = fetch('quiz/submitquiz', {
        method: 'POST',
        body: JSON.stringify({
            quizid: quizid,
            questionlist: questionlist,
            username: getUsername()
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        let data = await response.json();
        return data;
    }
    throw response;
}

//export const AddQuestion = async (question, func) => {

//    await fetch('quiz/addquestion', {
//        method: 'POST',
//        body: JSON.stringify({ question }),
//        headers: {
//            'Content-Type': 'application/json',
//            'Accept': 'application/json'
//        }
//    })
//        .then(res => res.json())
//        .then(res => LoadQuestions(func));
//}

//export const AddAnswer = async (answer, func) => {

//    await fetch('quiz/addanswer', {
//        method: 'POST',
//        body: JSON.stringify({ answer }),
//        headers: {
//            'Content-Type': 'application/json',
//            'Accept': 'application/json'
//        }
//    })
//        .then(res => res.json())
//        .then(res => LoadAnswers(func));
//}

export const LoadQuestions = async  (/*func*/) => {

    let Questions = [];
    const response = await fetch(`quiz/questions`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        let data = await response.json();
        for (var i = 0; i < data.length; i++) {
            Questions.push({ id: data[i].id, name: data[i].name });
        }
        return Questions;
    }
    throw response;
}

export const LoadAnswers = async  (/*func*/) => {

    let Answers = [];
    const response = await fetch(`quiz/answers`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        let data = await response.json();
        for (var i = 0; i < data.length; i++) {
            Answers.push({ id: data[i].id, name: data[i].name });
        }
        return Answers;
    }
    throw response;
}


export const LoadScoreBoard = async (/*abortController*/) => {

    let response = await fetch(`quiz/scoreboard`, {
        //signal: abortController.signal,
        method: 'POST',
        body: JSON.stringify({
            username: getUsername()
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + getJwtToken()
        }
    });
    //console.log(response.status);
    if (response.ok) {
        let data = await response.json();
        return data;
    }
    throw (response);
    //else if (response.status === 401 || response.status === 403) {
    //    throw new Error("Unauthorized Access");
    //}

}

export const LoadAdminQuizes = async (/*abortController*/) => {

    let response = await fetch(`quiz/adminquizes`, {
        //signal: abortController.signal,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + getJwtToken()
        }
    });
    //console.log(response.status);
    if (response.ok) {
        let data = await response.json();
        return data;
    }
    throw (response);

}

export const LoadQuizes = async (/*abortController*/) => {
     
    const response = await fetch(`quiz/quizes`, {
        //signal: abortController.signal,
        method: 'POST',
        body: JSON.stringify({
            username: getUsername()
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + getJwtToken()
        }
    });

    if (response.ok) {
        let data = await response.json();
        return data;
    }
    throw (response);
    //return Promise.reject(response);
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
            'Accept': 'application/json',
            'Authorization': "Bearer " + getJwtToken()
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

    let response = await fetch(`user/login`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            password: pwd
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (response.ok) {
        let data = await response.json();
        return data;
    }

    return Promise.reject(response);
        //.catch((response) => {
        //    console.log(response);
        //    response.json().then((json ) => {
        //        //console.log(json);
        //        return Error(json);
        //    })
        //});

}

export const RegisterUser = async (name, pwd) => {


    let response = await fetch(`user/registerUser`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            password: pwd
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (response.ok) {

        let data = await response.json();
        return data;

    }
    return Promise.reject(response);
        
}
