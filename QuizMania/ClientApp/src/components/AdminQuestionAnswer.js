﻿import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { AddQuestion, AddAnswer, LoadQuestions, LoadAnswers, EditAnswer, EditQuestion } from './Services';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import { BtnCellRenderer} from './BtnCellRenderer'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const AdminQuestionAnswer = () => {

    //const rowData = [
    //    { name: "Toyota", model: "Celica", price: 35000 },
    //    { name: "Ford", model: "Mondeo", price: 32000 },
    //    { name: "Porsche", model: "Boxter", price: 72000 }
    //];
    //const frameworkComponents = {
    //    buttonRenderer: BtnCellRenderer,
    //   // dropDownRenderer: DropDownRender,
    //};
    //const onBtnClick = () => {
    //    console.log('here');
    //}

    let textAnswerEditInput                                 = React.createRef();
    let textQuestionEditInput                               = React.createRef();
   
    const [answereditindex    , updateanswereditindex]      = useState(-1);
    const [questioneditindex  , updatequestioneditindex]    = useState(-1);
    const [answereditmessage  , updateanswereditmessage]    = useState('');
    const [questioneditmessage, updatequestioneditmessage]  = useState('');

    const [answermessage, setanswermessage] = useState('');
    const [questionmessage, setquestionmessage] = useState('');
    const [answer, setanswer] = useState('');
    const [question, setquestion] = useState('');

    const [questions, setquestionlist] = useState([]);
    const [answers, setanswerlist] = useState([]);

    useEffect(() => {
        LoadQuestions(setquestionlist);
        LoadAnswers(setanswerlist);
    }, []);

    //Questions

    const handlequestionchange = (e) => {
        setquestion(e.target.value);
    }

    const onEditQuestionChanged = e => {
        e.preventDefault();
        textQuestionEditInput.current.value = e.target.value;
    };

    const editQuestion = (id) => {
        EditQuestion(id, textQuestionEditInput.current.value, updatequestioneditmessage, setquestionlist);
        if (questioneditmessage.length == 0) {
            updatequestioneditindex(-1);
        }
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

    const AllQuestions = () => {

        return <div>
            <div className="mt-3 scrollable">
                {
                    questions.map((q, i) => {
                        return (
                            <div className="" key={i}>
                                {
                                    questioneditindex == i ?
                                        <div className="questionitem">
                                            <textarea
                                                ref={textQuestionEditInput}
                                                key={i}
                                                onChange={onEditQuestionChanged}
                                                defaultValue={q.name}
                                            ></textarea>
                                            <span className="text-danger small pl-2 pr-2">{questionmessage}</span>
                                            <div className="text-right">
                                                <button onClick={() => editQuestion(q.id)}>Save</button>
                                                <button onClick={() => updatequestioneditindex(-1)}>Cancel</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="questionitem">
                                            <span className="mr-2">A-{i + 1}) {q.name}</span>
                                            <div className="text-right">
                                                <button onClick={() => updatequestioneditindex(i)}>Edit</button>
                                            </div>
                                        </div>
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>;
        //const columnDefs = [
        //    {
        //        field: 'Name',
        //        valueFormatter: function (params) {
        //            return params.data.name;
        //        },
        //    },
        //    {
        //        headerName: "Delete Sessio",
        //        cellRenderer: "buttonRenderer",
        //        cellRendererParams: {
        //            onClick: function () {
        //                console.log('A');
        //            },
        //            label: "Edit",
        //        }
        //    }
             
        //]
        //return <div className="ag-theme-alpine" style={{ height: 400 }}>
        //        <AgGridReact frameworkComponents={frameworkComponents} columnDefs={columnDefs} rowData={questions}>
        //        </AgGridReact>
        //        </div>;

        //return <div className="mt-3 scrollable">
        //    {
        //        questions.map((q, i) => {
        //            return (
        //                <div className="questionitem" key={i}>
        //                    <span className="mr-2">Q {i + 1}</span> <span >{q}</span>
        //                </div>
        //            );
        //        })
        //    }
        //</div>;
    }

    //Questions

    //Answers

    const handleanswerchange = (e) => {
        setanswer(e.target.value);
    }

    const onEditAnswerChanged = e => {
        e.preventDefault();
        textAnswerEditInput.current.value = e.target.value;
    };

    const editAnswer = (id) => {
        //put await here
        EditAnswer(id, textAnswerEditInput.current.value, updateanswereditmessage, setanswerlist);
        if (answereditmessage.length == 0) {
             updateanswereditindex(-1);
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

    const AllAnswers = () => {
           
        return <div className="mt-3 scrollable">
            {
                answers.map((a, i) => {
                    return (
                        <div className="" key={i}>
                            {
                                answereditindex == i ?
                                    <div className="questionitem">
                                        <textarea
                                            ref={textAnswerEditInput}
                                            key={i}
                                            onChange={onEditAnswerChanged}
                                            defaultValue={a.name}
                                        ></textarea>
                                        <span className="text-danger small pl-2 pr-2">{answereditmessage}</span>
                                        <div className="text-right">
                                            <button onClick={() => editAnswer(a.id )}>Save</button>
                                            <button onClick={() => updateanswereditindex(-1)}>Cancel</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="questionitem">
                                        <span className="mr-2">A-{i + 1}) {a.name}</span>
                                        <div className="text-right">
                                            <button onClick={() => updateanswereditindex(i)}>Edit</button>
                                        </div>
                                    </div>
                            }
                        </div>
                    );
                })
            }
        </div>;
                 
    }

    //Answers

    return <div className="adminquiz2">
            <div className="textcenter">
                <div className="text-danger small">{questionmessage}</div>
                <div>
                    <textarea value={question} onChange={handlequestionchange} className="form-control" />
                </div>
                <button onClick={AddNewQuestion} className="button">Add Question</button>
                <AllQuestions />
            </div>
            <div className="textcenter mt-5">
                <div className="text-danger small" >{answermessage}</div>
                <div>
                    <textarea value={answer} onChange={handleanswerchange} className="form-control" />
                </div>
                <button onClick={AddNewAnswer} className="button">Add Answer</button>
                <AllAnswers />
            </div>
        </div>;
}