import React, { Component, useEffect, useState} from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Quiz } from './components/Quiz'
import { NavMenu } from './components/NavMenu'
import { ProgressBar } from 'react-bootstrap';
import { DataLoaderService } from './components/DataLoaderService'
import { AdminQuestionAnswer } from './components/AdminQuestionAnswer'
import { AdminQuiz } from './components/AdminQuiz'
import { AdminQuizStart } from './components/AdminQuizStart'
import { AdminQuizCreated } from './components/AdminQuizCreated'
import { AdminQuizList } from './components/AdminQuizList'
import { StartQuizPage } from './components/StartQuizPage'
import { EndQuizPage } from './components/EndQuizPage'
import { QuizList } from './components/QuizList'

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';

import './custom.css'

const Logo = () => {
    return <div id="header_in">
        <div id="logo_in"><a href="index.html"><img src="img/logo_black.png" width={160} height={48} alt="Quote" /></a></div>
        <NavMenu />
    </div>;
}

const Aside = (props) => {

    //const [title , settitle] = useState('');

    return <aside className="col-xl-3 col-lg-4">
        {/*<h2>{props.text}</h2>*/}
        {/*<p className="lead">Quiz # {props.quiz.QuizNumber}</p>*/}
        <h2>{props.text}</h2>
        <p className="lead">Quiz # 23</p>
        <ul className="list_ok">
            <li>Please select at least one correct answer.</li>
            <li>Use the Next button tp proceed forward.</li>
            <li>Use the Back button tp move backwards.</li>
        </ul>
    </aside>;
}

const Header = () => {
    return <header>
        <a id="menu-button-mobile" className="cmn-toggle-switch cmn-toggle-switch__htx" href="#"><span>Menu mobile</span></a>
        <nav className="main_nav">
            <ul className="nav nav-tabs">
                <li><a href="#tab_1" data-toggle="tab" className="active show">Request a quote</a></li>
                <li><a href="#tab_2" data-toggle="tab">About</a></li>
                <li><a href="#tab_3" data-toggle="tab">Contact</a></li>
            </ul>
        </nav>
    </header>;
}


function App() {

    const [text, settext] = useState('');
    const updatetext = (newVal) => {
        settext(newVal);
    }

    return (
        <div>
            <div id="loader_form">
                <div data-loader="circle-side-2" />
            </div>
            <div id="main_container" className="visible">
                <Logo />
                <div className="wrapper_in">
                    <div className="container-fluid">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" >
                                <div className="subheader" id="quote" />
                                <div className="row">
                                    <Aside text={text} />
                                    <Layout>
                                        <Route exact path='/'                   component={(e) => <Home  {...e} updatetext={updatetext}  />} />
                                        <Route path='/counter'                  component={(e) => <Counter  {...e} updatetext={updatetext} />} />
                                        <AuthorizeRoute path='/startquizpage'   component={(e) => <StartQuizPage {...e} updatetext={updatetext} />} />
                                        <AuthorizeRoute path='/quizlist'        component={(e) => <QuizList {...e} updatetext={updatetext} />} />
                                        <AuthorizeRoute path='/endquizpage'     component={(e) => <EndQuizPage updatetext={updatetext}   />}  />
                                        <AuthorizeRoute path='/quiz'            component={(e) => <Quiz {...e} updatetext={updatetext} />} />
                                        <AuthorizeRoute path='/adminquizstart'  component={(e) => <AdminQuizStart {...e} updatetext={updatetext}   />}   />
                                        <AuthorizeRoute path='/adminquiz'       component={(e) => <AdminQuiz  {...e} updatetext={updatetext}   />}   />
                                        <AuthorizeRoute path='/adminquizlist'   component={(e) => <AdminQuizList  {...e}  updatetext={updatetext}  />}  />
                                        <AuthorizeRoute path='/adminquizcreated' component={(e) => <AdminQuizCreated  {...e} updatetext={updatetext}  />}    />
                                        <AuthorizeRoute path='/adminquestiponanswer' component={(e) => <AdminQuestionAnswer  {...e} updatetext={updatetext}   />}    />
                                        <AuthorizeRoute path='/fetch-data'      component={FetchData} />
                                        <AuthorizeRoute path='/dataload'        component={DataLoaderService} />
                                        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                                        
                                    </Layout>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;