import React, { useState } from 'react';
import {  NavLink } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

export const StartQuizPage = (props) => {
    //load total questions 
    const [classs, setclasss] = useState(true);
    const params = useParams();
    
    return (
            <div className={`noti-section-one noti-design-one ${classs ? 'fadeInLeft' : 'fadeOutLeft'} animated`}>
            <div className="noti-layout-three">
                <div className="noti-layout-three__wrapper">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="noti-layout-three__logo-wrap">
                                <img
                                    src="./Notifications/assets/images/butterfly.png" alt=""
                                    className="img-responsive noti-layout-three__sticker-image "
                                />
                                <img
                                    src="./Notifications/assets/images/index1.png"
                                    alt=""
                                    className="img-responsive noti-layout-three__logo"
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="noti-layout-three__para-wrap">
                                <h3><b>{params.name}</b></h3>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="noti-layout-three__check-in-button">
                                <NavLink tag={Link} className="button"
                                    to={{
                                        pathname: '/quiz/' + params.id + ' /' + params.name, 
                                        state: { id: params.id, name: params.name }
                                    }}>
                                    <button type="button" className="noti-layout-three__check-in" onClick={(e) => { setclasss(false) }} >
                                        Start Quiz
                                    </button>
                                </NavLink>

                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="noti-layout-three__button-wrap">
                                <a href="/#" className="anchor-btn close-one">
                                    Best of Luck !
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );
}

//const EOQ_Notification = () => {

//    return (
//        <div className="noti-section-one noti-design-one fadeInLeft animated">
//            <div className="noti-layout-three">
//                <div className="noti-layout-three__wrapper">
//                    <div className="row">
//                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                            <div className="noti-layout-three__logo-wrap">
//                                <img
//                                    src="./Notifications/assets/images/butterfly.png"
//                                    className="img-responsive noti-layout-three__sticker-image "
//                                />
//                                <img
//                                    src="./Notifications/assets/images/index1.png"
//                                    className="img-responsive noti-layout-three__logo"
//                                />
//                            </div>
//                        </div>
//                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                            <div className="noti-layout-three__para-wrap">
//                                <p>Quiz</p>
//                            </div>
//                        </div>
//                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                            <div className="noti-layout-three__check-in-button">
//                                <a className="button nav-link" href="/quiz">
//                                    <button type="button" className="noti-layout-three__check-in">
//                                        Start Quiz
//                                    </button>
//                                </a>
//                            </div>
//                        </div>
//                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                            <div className="noti-layout-three__button-wrap">
//                                <a href="#" className="anchor-btn close-one">
//                                    Best of Luck !
//                                </a>
//                            </div>
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
//}