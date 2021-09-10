import React, { Component } from 'react';

export class DataLoaderService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: [{ id: 0, Name: '' }],
            question: {
                QID  : 0,
                Name : '',
                Answers: [],
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

        //fetch(`weatherforecast`, {
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'Accept': 'application/json'
        //    }

        //})
        //    .then((response) => response.json())
        //    .then((messages) => { console.log("messages"); });

        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //this.setState({ forecasts: data, loading: false });
    }

    render() {
        return <div>{this.state.quiz.Name}</div>;
    }
}