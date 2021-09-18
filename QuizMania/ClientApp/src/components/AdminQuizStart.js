import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const AdminQuizStart = () => {

    const [quizname, setquizname] = useState('');

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
                                <input onChange={(e) => { setquizname(e.target.value)}} type="text" className="form-control" />
                                </div>
                            </div>
                            <div id="bottom-wizard">
                            <NavLink tag={Link} className="button"
                                to={{
                                    pathname: '/adminquiz',
                                    state: { name: quizname },
                            }}>
                                <button className="button" type="button"><i className="icon-forward-2 text-success"/>Next</button>
                            </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

}