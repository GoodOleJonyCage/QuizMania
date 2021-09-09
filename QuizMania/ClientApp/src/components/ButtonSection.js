import React, { Component } from 'react';

export const ButtonSection = (props) => {
    return <div id="bottom-wizard">
                {
                    //<button
                        //    onClick={() => { props.moveToNextQuestion() }}
                        //    type="submit" name="process" className="submit">Submit</button>
                        props.LastPage ? ""
                        :
                        <div>
                            <button onClick={() => { props.moveToPreviousQuestion() }}
                                type="button" name="backward" className="backward">Back </button>
                            <button onClick={() => { props.moveToNextQuestion() }}
                                type="button" name="forward" className="forward">Next</button>
                        </div>
                }
           </div>
}
