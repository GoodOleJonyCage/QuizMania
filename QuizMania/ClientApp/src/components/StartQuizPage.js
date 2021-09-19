import React, { Component, useState, useEffect } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const StartQuizPage = (props) => {
    //load total questions 
    const [classs, setclasss] = useState(true);
    return (
        <div >
            {/*<button className="button" onClick={(e) => { setclasss(true) }}>Show</button>*/}
            <div className={`mb-5 noti-section-one noti-design-seventeen ${classs ? 'fadeInLeft' : 'fadeOutLeft'} animated`}>
                <div className="noti-layout-nine">
                    <div className="noti-layout-nine__wrapper">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h3 className="noti-layout-nine__heading">{props.location.state.name}</h3>
                                <button type="button" className="noti-layout-nine__close close-one" onClick={(e) => { setclasss(false) }} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="noti-layout-nine__content-wrap">
                                    <div className="noti-layout-nine__img-wrap">
                                        <img src="./Notifications/assets/images/congrats.png" />
                                    </div>
                                    <p className="noti-layout-nine__paragraph">
                                        BEST OF LUCK!
                                    </p>
                                    <NavLink tag={Link} className="button"
                                        to={{
                                            pathname: '/quiz',
                                            state: { id: props.location.state.id, name: props.location.state.name }
                                        }}
                                        /*onClick={(e) => linkclicked(e)}*/ >
                                        <button className="noti-layout-nine__continue"  ><i className="icon-forward-2 text-success" />Start Quiz</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}