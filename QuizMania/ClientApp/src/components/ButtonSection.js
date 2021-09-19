import React, { Component } from 'react';

export const ButtonSection = (props) => {
    return props.QuestionIndex == props.QuestionLength ? "" :
        <div id="bottom-wizard" >
            {
                props.QuestionIndex == 0 ? "" :
                    <button onClick={() => { props.moveToPreviousQuestion() }}
                        type="button" name="backward" className="backward">Back </button>
            }
            {
                props.QuestionIndex + 1 == props.QuestionLength ?
                    <button
                        onClick={() => { props.submitQuiz() }}
                        type="submit" name="process" className="submit">Submit</button>
                    :
                    <button onClick={() => { props.moveToNextQuestion() }}
                        type="button" name="forward" className="forward">Next</button>
            }
        </div>
}
