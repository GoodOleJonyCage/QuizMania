import React, { Component, useState, useEffect } from 'react';
import { LoadQuiz } from './Services'
import { submitQuizService } from './Services'
import { QuestionContainer } from './QuestionContainer'


export const Quiz = () => {

    const [quiz, updatequizObj] = useState({ QuizNumber: 0, Name: '' });
    const [questions, updatequiz] = useState([]);
    const [currentquestionindex, setcurrentquestionindex] = useState(0);

    useEffect(() => {
        updatequizObj({ QuizNumber: 11, Name: 'History of Mankind' });
        LoadQuiz(updatequiz);
    }, []);


    const moveToNextQuestion = () => {

        if (currentquestionindex == questions.length)
            return;

        let newquestions = [...questions];
        var answered = false;
        for (var i = 0; i < newquestions[currentquestionindex].Answers.length; i++) {
            if (newquestions[currentquestionindex].Answers[i].Selected) {
                answered = true;
                break;
            }
        }
        if (answered) {
            newquestions[currentquestionindex].Message = '';
            setcurrentquestionindex(currentquestionindex + 1);
        }
        else {
            newquestions[currentquestionindex].Message = 'Please answer one';
            updatequiz(newquestions);
        }
        updatequiz(newquestions);
    }

    const submitQuiz  = () => {

        moveToNextQuestion();
        submitQuizService(questions);
        //ajax call 
    }

    const moveToPreviousQuestion = () => {
        if (currentquestionindex == 0)
            return;
        setcurrentquestionindex(currentquestionindex - 1);
    }

    const selectOneAnswer = (questionindex, answerindex) => {
        let newquestions = [...questions];
        for (var i = 0; i < newquestions[questionindex].Answers.length; i++) {
            newquestions[questionindex].Answers[i].Selected = false;
        }
        newquestions[questionindex].Answers[answerindex].Selected = true;
        updatequiz(newquestions);
    }

    const disableClick = () => {
        return;
    }

    const getPercentCompleted = () => {
        let result = Math.trunc((currentquestionindex / questions.length) * 100);
        return Number.isNaN(result) ? 0 : result;
    }

    const calculateScore = () => {
        var answeredCorrectly = 0;
        for (var i = 0; i < questions.length; i++) {
            for (var j = 0; j < questions[i].Answers.length; j++) {
                if (
                    questions[i].Answers[j].Selected &&
                    questions[i].Answers[j].AnsweredCorrectly &&
                    true
                ) {
                    answeredCorrectly++;
                    break;
                }
            }
        }
        return Math.trunc((answeredCorrectly / questions.length) * 100);
    }


    return (
        <QuestionContainer
            quiz={quiz}
            disableClick={disableClick}
            calculateScore={calculateScore}
            getPercentCompleted={getPercentCompleted}
            moveToPreviousQuestion={moveToPreviousQuestion}
            submitQuiz={submitQuiz}
            moveToNextQuestion={moveToNextQuestion}
            currentquestionindex={currentquestionindex}
            selectOneAnswer={selectOneAnswer}
            Questions={questions} />
    );
}