import { createContext, useEffect, useState, Component } from "react";
import axios from 'axios';

export const LoadQuiz = (func) =>
{
    //axios.get('controller')
    //    .then((response) => {
    //        console.log(response.data);
    //    });
 
    //fetch('controller')
    //    .then(response => console.log(response.json()))
    //    .then(commits => console.log((commits ))

    //axios({
    //    "method": "GET",
    //    "url": "controller/Get",
    //    //"headers": {
    //    //    "content-type": "application/octet-stream",
    //    //    "x-rapidapi-host": "quotes15.p.rapidapi.com",
    //    //    "x-rapidapi-key": process.env.REACT_APP_API_KEY
    //    //}, "params": {
    //    //    "language_code": "en"
    //    //}
    //})
    //    .then((response) => {
    //        console.log(response.data)
    //    })
    //    .catch((error) => {
    //        console.log(error)
    //    })

    //fetch("controller", {
    //    method: "post",
    //    headers: {
    //        "Content-Type": "application/json",
    //    },
    //})
    //    .then((response) => console.log(response.text()))
    //    .then((data) => console.log(data));

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

    //useEffect(() => {
    //    LoadDB()
    //    //getToken();
    //}, [])

    
}



