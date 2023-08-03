import React, { Component } from 'react';

export class DataLoaderService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: [{ id: 0, Name: '' }],
            question: {
                QID  : 0,
                Name : '',
               /* Answers: [],*/
                Active: true,
                Message: '',
                Answers: [
                    {
                        AID: 1,
                        Name: '',
                        Selected: false,
                        AnsweredCorrectly: false
                    },
                    {
                        AID: 2,
                        Name: '',
                        Selected: false,
                        AnsweredCorrectly: false
                    },
                    {
                        AID: 3,
                        Name: '',
                        Selected: false,
                        AnsweredCorrectly: false
                    },
                    {
                        AID: 4,
                        Name: '',
                        Selected: false,
                        AnsweredCorrectly: false
                    }
                ]
            }
        };
    }

    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        //let Questions = [];
        //fetch(`quiz`, {
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'Accept': 'application/json'
        //    }

        //})
        //    .then((response) => response.json())
        //    .then((data) => {
        //        for (var i = 0; i < data.questions.length; i++) {
        //            let question = { QID: data.questions[i].qid, Name: data.questions[i].name, Answers: [], Active: true, Message: '' };
        //            for (var j = 0; j < data.questions[i].answers.length; j++) {
        //                question.Answers.push({ AID: data.questions[i].answers[j].aid, Name: data.questions[i].answers[j].name, Selected: false, AnsweredCorrectly: false });
        //            }
        //            Questions.push(question);
        //        }
        //        console.log(Questions);
        //    });
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });
    }

    render() {
        return <div>{this.state.quiz.Name}</div>;
    }
}