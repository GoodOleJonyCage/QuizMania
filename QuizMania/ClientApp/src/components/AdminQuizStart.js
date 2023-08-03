import React from 'react';
import {NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const AdminQuizStart = () => {

    const [quiz, setquiz] = useState({name :'', message :''});

    const linkclicked = (e) => {
        if (!quiz.name) {
            e.preventDefault();
            setquiz({  message: "Quiz Name Required"})
        }
        else
            setquiz({ message: "" })
    }

    return <div className="col-xl-9 col-lg-8 noborder container">
            <div className="wizard-branch wizard-wrapper">
                <div className="step wizard-step cumoveToNextQuestionrrent">
                    <div id="wizard_container">
                        <div>
                            <div id="middle-wizard">
                                <div className="step">
                                    <h5 className="main_question mb-5">
                                        Enter Quiz Name
                                </h5>
                                <input onChange={(e) => { setquiz({ name: e.target.value })}} type="text" className="form-control" />
                                </div>
                        </div>
                        <div className="text-center text-danger">
                            {quiz.message}
                        </div>
                            <div id="bottom-wizard">
                                <NavLink tag={Link} className="button"
                                    to={{
                                        pathname: '/adminquiz',
                                        state: { id: 0 , name: quiz.name },
                                    }}
                                    onClick={(e) => linkclicked(e)}>
                                    <button className="button" type="button"><i className="icon-forward-2 text-success"/>Next</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

}
