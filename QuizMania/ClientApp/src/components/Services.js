import { createContext, useEffect, useState, Component } from "react";
import axios from 'axios';
import { Question } from "./Question";

export const LoadQuiz = (func) => {

    let Questions = [];

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
                Questions.push({ name: data[i].name });
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
                Answers.push(data[i].name);
            }
            func(Answers);
        });
}

