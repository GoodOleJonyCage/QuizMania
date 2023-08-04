import React from 'react';
import { useRef,useState, useEffect } from 'react';
import {  LoadQuestions, LoadAnswers, EditAnswer, EditQuestion } from './Services';
/*import { AgGridColumn, AgGridReact } from 'ag-grid-react';*/
//import ReactDom from 'react-dom';
//import Popup from 'react-popup';
/*import { BtnCellRenderer} from './BtnCellRenderer'*/
import { LoadingDiv } from './LoadingDiv'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const AdminQuestionAnswer = (props) => {

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
    //edit question and answer
    const [editquestion, updateeditquestion] = useState({ index: -1, message: '' });
    const [editanswer, updateeditanswer]     = useState({ index: -1, message: '' });
    //add question answer
    //const [question, setquestion]   = useState({ name: '', message: '' });
    const [answer  , setanswer  ]   = useState({ name: '', message: '' });
    //list of questions and answers
    const [questions, setquestionlist] = useState([]);
    const [answers, setanswerlist] = useState([]);

    //const [divQuestionScollPosition, setdivQuestionScollPosition] = useState(0);
    //figure out how load scroll position
    const bottomRef = useRef(null);


    const ReLoadQuestions = async () => {
        const vmsetquestionlist = await LoadQuestions();
        setquestionlist(vmsetquestionlist);
    }

    const ReLoadAnswers = async () => {
        const vmsetanswerlist = await LoadAnswers();
        setanswerlist(vmsetanswerlist);
    }

    const LoadData = async () => {

        try {
            
            ReLoadQuestions();
            ReLoadAnswers();

        } catch (response) {
            if (response.status === 401)
                props.clearToken();
        }
    }

    useEffect(() => {
        LoadData();
    });

    //Questions

    //const handlequestionchange = (e) => {
    //    setquestion({ name: e.target.value });
    //}

    const onEditQuestionChanged = e => {
        e.preventDefault();
        textQuestionEditInput.current.value = e.target.value;
        //let v = textQuestionEditInput.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const editCurrentQuestion = (id,i) => {
        EditQuestion(id, textQuestionEditInput.current.value )
            .then(result => {
                if (result.errored) {
                    updateeditquestion({ index: i ,message: result.message });
                }
                else {
                    updateeditquestion({ index: -1, message: '' });
                    ReLoadQuestions();
                    //LoadQuestions(setquestionlist);
                    //let v  = bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
                
            });
     
    }

    //const AddNewQuestion = () => {
    //    if (question.name.length == 0) {
    //        setquestion({ message: 'Required' });
    //    }
    //    else {
    //        AddQuestion(question.name, setquestionlist);
    //        setquestion({ name : '', message :''});
    //    }
    //}

    const AllQuestions = () => {

        return <div>
            <div
                
                className="mt-3 " >
                {
                    questions.length === 0 ? <LoadingDiv></LoadingDiv> :
                    questions.map((q, i) => {
                        return (
                            <div className="item-row" key={i} ref={bottomRef}>
                                {
                                    editquestion.index === i ?
                                        <div className="questionitem" >
                                            <div className="questionitem" >
                                                <span className="mr-2">Q-{i + 1})</span>
                                                <textarea 
                                                    ref={textQuestionEditInput}
                                                    key={i}
                                                    onChange={onEditQuestionChanged}
                                                    defaultValue={q.name}
                                                ></textarea>
                                            </div>
                                            <span className="text-danger small pl-2 pr-2">{editquestion.message}</span>
                                            <div className="text-right">
                                                <button className="mr-1" onClick={(e) => editCurrentQuestion(q.id, i)}>
                                                    <i className="icon-ok-1 text-success" />
                                                    Save</button>
                                                <button onClick={() => updateeditquestion({ index: -1, message: '' })}>
                                                    <i className="icon-block-4 text-danger" />
                                                    Cancel</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="questionitem">
                                            <span ><span className="mr-2">Q-{i + 1})</span>{q.name}</span>
                                            <div className="text-right">
                                                <button onClick={() => updateeditquestion({ index: i, message: ''})}>
                                                    <i className="icon-edit text-success"></i>
                                                    Edit</button>
                                            </div>
                                        </div>
                                }
                            </div>
                        );
                    })
                }
                 
            </div>
        </div>;
        
    }

     
    const onEditAnswerChanged = e => {
        e.preventDefault();
        textAnswerEditInput.current.value = e.target.value;
    };

    const editCurrentAnswer = (id,i) => {
        EditAnswer(id, textAnswerEditInput.current.value )  
          .then(result => {
              if (result.errored) {
                  updateeditanswer({ index: i, message: result.message });
              }
              else {
                  updateeditanswer({ index: -1, message: '' });
                  ReLoadAnswers();
              }
          });
    }

     
    const AllAnswers = () => {
           
        return <div className="mt-3 ">
            {
                answers.length === 0 ? <LoadingDiv></LoadingDiv> :
                answers.map((a, i) => {
                    return (
                        <div className="item-row" key={i}>
                            {
                                editanswer.index === i ?
                                    <div className="questionitem">
                                        <div className="questionitem">
                                            <span className="mr-2">A-{i + 1})</span>
                                            <textarea
                                                ref={textAnswerEditInput}
                                                key={i}
                                                onChange={onEditAnswerChanged}
                                                defaultValue={a.name}
                                                ></textarea>
                                        </div>
                                        <span className="text-danger small pl-2 pr-2">{editanswer.message}</span>
                                        <div className="text-right">
                                            <button className="mr-1" onClick={() => editCurrentAnswer(a.id, i)}>
                                                <i className="icon-ok-1 text-success" />
                                                Save</button>
                                            <button onClick={() => updateeditanswer({ index: -1, message: '' })}>
                                                <i className="icon-block-4 text-danger" />
                                                Cancel</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="questionitem">
                                        <span ><span className="mr-2">A-{i + 1})</span>{a.name}</span>
                                        <div className="text-right">
                                            <button onClick={() => updateeditanswer({ index: i, message: '' })}>
                                                <i className="icon-edit text-success"/>
                                                Edit</button>
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
                {/*<div className="text-danger small">{question.message}</div>*/}
                {/*<div>*/}
                {/*    <textarea value={question.name} onChange={handlequestionchange} className="form-control" />*/}
                {/*</div>*/}
            {/*<button onClick={AddNewQuestion} className="button">*/}
            {/*    <i className="icon-plus-circle-1 text-success" />*/}
            {/*    Add Question</button>*/}
                <div>Questions</div>
                <AllQuestions />
            </div>
           
            <div className="textcenter mt-5">
                <div className="text-danger small" >{answer.message}</div>
                {/*<div>*/}
                {/*    <textarea value={answer.name} onChange={handleanswerchange} className="form-control" />*/}
                {/*</div>*/}
                {/*<button onClick={AddNewAnswer} className="button">*/}
                {/*    <i className="icon-plus-circle-1 text-success" />*/}
            {/*    Add Answer</button>*/}
            <div>Answers</div>
                <AllAnswers />
            </div>
        </div>;
}