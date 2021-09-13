import { createContext, useEffect, useState, Component } from "react";
import axios from 'axios';

export const LoadQuiz = (func) => {

    let Questions = [];
    //axios({
    //    "method": "GET",
    //    "url": "quiz",
    //    //"headers": {
    //    //    "content-type": "application/octet-stream",
    //    //    "x-rapidapi-host": "quotes15.p.rapidapi.com",
    //    //    "x-rapidapi-key": process.env.REACT_APP_API_KEY
    //    //}, "params": {
    //    //    "language_code": "en"
    //    //}
    //})
    //    .then((data) => {
    //        for (var i = 0; i < data.questions.length; i++) {
    //            let question = { QID: data.questions[i].qid, Name: data.questions[i].name, Answers: [], Active: true, Message: '' };
    //            for (var j = 0; j < data.questions[i].answers.length; j++) {
    //                question.Answers.push({ AID: data.questions[i].answers[j].aid, Name: data.questions[i].answers[j].name, Selected: false, AnsweredCorrectly: false });
    //            }
    //            Questions.push(question);
    //        }
    //        func(Questions);
    //    })
    //    .catch((error) => {
    //        console.log(error)
    //    })
    
    fetch(`quiz`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
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
           // console.log(Questions);
            func(Questions);
        });
}

export const submitQuizService = (questionlist) => {
    console.log(questionlist);
    fetch('quiz/submitquiz', {
        method: 'POST',
        body: JSON.stringify({ questionlist }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => console.log(res));
    //console.log(questions);
}

