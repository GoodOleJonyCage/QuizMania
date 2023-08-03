import React, {  useState  } from 'react';
import {   NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const EndQuizPage = (props) => {

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
                                        <h1 className="noti-layout-nine__heading">props.title</h1> :
                                        <h1 className="noti-layout-nine__heading">Congrats!</h1>
                                }
                                <button type="button" className="noti-layout-nine__close close-one" onClick={(e) => { setclasss(false) }} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="noti-layout-nine__content-wrap">
                                    <div className="noti-layout-nine__img-wrap">
                                        <img src="./Notifications/assets/images/congrats.png" alt="" />
                                    </div>
                                    {
                                        props.message ?
                                            <p className="noti-layout-nine__paragraph">props.message</p> :
                                            <p className="noti-layout-nine__paragraph">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry
                                            </p>
                                    }
                                    <button type="button" className="noti-layout-nine__continue">
                                        Continue
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