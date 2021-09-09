import { createContext, useEffect, useState, Component } from "react";
import axios from 'axios';

export const LoadQuiz = (func) => {

    //axios.get('%PUBLIC_URL%/controller')
    //    .then((response) => {
    //        console.log(response.data);
    //    });

    let Questions = [];
    for (var i = 1; i < 5; i++) {

        let question = { QID: i, Name: `Q${i}`, Answers: [], Active: true, Message :'' };

        question.Answers.push({ AID: 1, Name: `A1-${i}`, Selected: false, AnsweredCorrectly: false });
        question.Answers.push({ AID: 2, Name: `A2-${i}`, Selected: false, AnsweredCorrectly: false});
        question.Answers.push({ AID: 3, Name: `A3-${i}`, Selected: false, AnsweredCorrectly: false});
        question.Answers.push({ AID: 4, Name: `A4-${i}`, Selected: false, AnsweredCorrectly: true});

        Questions.push(question);
    }

    func(Questions);
}



