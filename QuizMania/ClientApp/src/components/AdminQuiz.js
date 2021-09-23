import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { LoadAnswers, LoadQuestions, SaveQuiz, LoadQuizToEdit } from './Services'
 
let ddAnsSelected = React.createRef();
let ddQuestionSelected = React.createRef();

const AddQuestion = (props) => {

    return <div className="text-center">
        <label className="label">Question</label>
        <select className="form-control"
            ref={ddQuestionSelected}
            onChange={(e) => { ddQuestionSelected.current.value = e.target.value }}>
            {
                props.questions.map(q => {
                    return <option key={ q.id} value={q.id}>{q.name}</option>
                })
            }
        </select>
    </div>;
}

const AddAnswer = (props) => {

    var ansID = ddAnsSelected.current.value;
    var answerExists = props.selectedanswers.filter(a => { return a.id == ansID });
    if (answerExists.length == 0) {

        var answer = props.answers.filter(a => { return a.id == ansID });
        var newselectedanswers = [...props.selectedanswers];
        newselectedanswers.push({ id: answer[0].id, name: answer[0].name, iscorrect :false });
        props.setselectedanswers(newselectedanswers);
    }
}

const SelectAnswer = (props) => {

    return <div className="text-center">
            <label className="label">Answer</label>
            <select className="form-control"
                ref={ddAnsSelected}                onChange={(e) => { ddAnsSelected.current.value = e.target.value }} >                {
                    props.answers.map(a => {
                        return <option key={a.id} value={a.id}>{a.name}</option>
                    })
                }
            </select>
            <div className="text-right">
                <button className="button" onClick={() => { AddAnswer(props) }}>
                <i className="icon-plus-circle-1 text-success" />Add Answer</button>
            </div>
            <div className="text-right mt-1">
                <button className="button" onClick={() => { props.setselectedanswers([]) }}>
                <i className="icon-cancel-circle-2 text-danger" />Clear Answers</button>
            </div>
        </div>;
}

const SelectedAnswers = (props) => {

    return <div className="text-center">
        {
            props.selectedanswers.map((ans, answerindex) => {
                return (
                    <div className="quizansweritem" key={answerindex}>
                        <span className="mr-2">A-{answerindex + 1})</span>
                        <input type="radio" name="rdo_selectedanswers" className="mr-2"
                            onChange={(e) => { ans.iscorrect = !ans.iscorrect }}
                            value={ans.iscorrect} />
                        <span key={ans.id} className="label">{ans.name}</span>
                    </div>
                );
            })
        }
    </div>

}

const AddQAToQuiz = (props) => {
    
    if (props.selectedanswers.length > 0) {
        var atLeastOneAnsSelected = props.selectedanswers.filter(a => { return a.iscorrect == true });
        if (atLeastOneAnsSelected.length > 0) {
            var qID = ddQuestionSelected.current.value;
            var questionExists = props.questionanswers.filter(q => { return q.id == qID });
            if (questionExists.length == 0) {
                props.setselectedanswers([]);
                var question = props.questions.filter(q => { return q.id == qID });
                var newquestionanswers = [...props.questionanswers];
                newquestionanswers.push({ id: question[0].id, name: question[0].name, answers: props.selectedanswers });
                props.setquestionanswers(newquestionanswers);
                props.setmessage('');
            }
        }
        else {
            props.setmessage('At least one answer must be selected');
        }
    }
}

const AddToQuiz = (props) => {

    return <div className="text-center mt-3">
                <button className="button button-primary" onClick={(e) => AddQAToQuiz(props)}>
                <i className="icon-plus-circle-1 text-success" />
                Add Question/Answers To Quiz</button>
            </div>;
}

const SaveCurrentQuiz = (props) => {
    console.log(SaveQuiz(props.location.state.id,props.location.state.name, props.questionanswers));
    props.history.push('/adminquizlist')
}

const QuestionAnswerRemoved = (props,questionasnwer) => {

    var newquestionanswers = props.questionanswers.filter(x => x.id != questionasnwer.id);
    props.setquestionanswers(newquestionanswers);
}

const QuizQuestionAnswers = (props) => {

    return <div className="text-center">
        {
            props.questionanswers.map((q, i) => {
                return (
                    <div key={i} className="mt-3">
                        <div key={i}  className="editquestionitem" >
                            <div key={i} >
                                <span className="mr-2">Q-{i + 1})</span>
                                <span key={q.id} className="labelflex">
                                {q.name}
                                </span>
                            </div>
                            <a  onClick={(e) => { QuestionAnswerRemoved(props, q) }}>
                                <i className="icon-cancel-circle-2 color-red" />
                            </a>
                        </div>
                        {
                            q.answers.map((a, ai) => {
                                return <div key={ai} className="quizansweritem ml-2">
                                        <span className="ml-2">A-{ai + 1})</span>
                                        <div className="ml-2" key={a.id}>{a.name}</div>
                                    </div>
                            })
                        }
                    </div>
                );
            })
        }

    </div>
}

const AddButton = (props) => {

    return <div className="mt-2 text-center">
            {
                props.questionanswers.length > 0 ?
                <button className="button" onClick={(e) => SaveCurrentQuiz( props)}>
                        <i className="text-success icon-hdd" />
                        Save Quiz</button> : ""
            }
         </div>;
}

const Header = (props) => {

    return <div className="text-center mb-3"><h4>{props.location.state.name}</h4></div>;
}

const Message = (props) => {

    return <div className="text-center text-danger mt-3">{props.message}</div>;
}



export const AdminQuiz = (props) => {

    //question list
    const [questions, setquestions] = useState([]);
    //answer list
    const [answers, setanswers] = useState([]);

    const [selectedquestion, setselectedquestion] = useState({ id: 0, name: '' });
    //answers for that question
    const [selectedanswers, setselectedanswers] = useState([]);
    //quiz question answers
    const [questionanswers, setquestionanswers] = useState([]);

    const [message,setmessage] = useState('');

    useEffect(() => {
        LoadQuestions(setquestions);
        LoadAnswers(setanswers);

        let quizid = props.location.state.id;
        if (quizid > 0) {
            LoadQuizToEdit(quizid, setquestionanswers);
        }

    }, []);
    
    return <div>
            <Header {...props} />
            <AddQuestion questions={questions} />
            <div className="quiz-answer-area">
                <SelectAnswer answers={answers} selectedanswers={selectedanswers} setselectedanswers={setselectedanswers} />
                <SelectedAnswers selectedanswers={selectedanswers} />
            </div>
            <Message message={message} />
            <AddToQuiz
                setmessage={setmessage}
                setselectedanswers={setselectedanswers}
                setselectedquestion={setselectedquestion}
                selectedquestion={selectedquestion}
                selectedanswers={selectedanswers}
                questions={questions}
                setquestionanswers={setquestionanswers}
                questionanswers={questionanswers}
                {...props} />
        <QuizQuestionAnswers setquestionanswers={setquestionanswers} questionanswers={questionanswers} />
            <AddButton questionanswers={questionanswers}  {...props}/>
        </div>;
}
