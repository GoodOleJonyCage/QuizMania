import React, { Component, useState, useEffect } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const StartQuizPage = (props) => {

    const [classs, setclasss] = useState(true);

    return (
        <div>
            <button className="button" onClick={(e) => { setclasss(true) }}>Show</button>
            <div className={`noti-section-one noti-design-seventeen ${classs ? 'fadeInLeft' : 'fadeOutLeft'} animated`}>
                <div className="noti-layout-nine">
                    <div className="noti-layout-nine__wrapper">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {
                                    props.title ?
                                        <h3 className="noti-layout-nine__heading">props.title</h3> :
                                        <h3 className="noti-layout-nine__heading">History of Mankind</h3>
                                }
                                <button type="button" className="noti-layout-nine__close close-one" onClick={(e) => { setclasss(false) }} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="noti-layout-nine__content-wrap">
                                    <div className="noti-layout-nine__img-wrap">
                                        <img src="./Notifications/assets/images/congrats.png" alt />
                                    </div>
                                    {
                                        props.message ?
                                            <p className="noti-layout-nine__paragraph">props.message</p> :
                                            <p className="noti-layout-nine__paragraph">
                                               Your Quiz Starts Now! 
                                            </p>
                                    }
                                    <button type="button" className="noti-layout-nine__continue">
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavLink tag={Link} className="button"
                to={{
                    pathname: '/quizstart',
                    //state: { id: 0, name: quiz.name },
                }}
                /*onClick={(e) => linkclicked(e)}*/
                >
                <button className="button" type="button"><i className="icon-forward-2 text-success" />Start Quiz</button>
            </NavLink>
        </div>
    );
}