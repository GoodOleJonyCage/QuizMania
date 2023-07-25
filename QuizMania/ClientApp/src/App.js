import React, { Component, useEffect, useState} from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Quiz } from './components/Quiz'
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
import { useLocation } from "react-router-dom";
import { Aside } from './components/Aside'
import { Login } from './components/Login'
import { Logo } from './components/Logo'
import { useToken } from './components/useToken'

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';

import './styles/custom.css'
import './styles/login.css'
import './styles/shortcodes.css'

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

////use enums
    //function pageType(string route) {
    //    let pagetype = "";
    //    switch (location.pathname) {

    //        case "/":
    //            pagetype = "Home";
    //            break;
    //        case "/quizlist":
    //            pagetype = "Our Quizes";
    //            break;

    //        case "/adminquizlist":
    //            pagetype = "Admin - Our Quizes";
    //            break;

    //        case "/adminquizstart":
    //            pagetype = "Create Quiz";
    //            break;


    //        case "/adminquiz":
    //            pagetype = "Start Quiz";
    //            break;

    //        case "/adminquestiponanswer":
    //            pagetype = "Questions and Answers";
    //            break;

    //        default:
    //            title = "Home";
    //            break;
    //    }
    //    return pagetype;
    //}

function GetTitle() {
        let title = "Home";
        const location = useLocation();
        //console.log(location);
        switch (location.pathname) {

            case "/":
                title = "Home";
                break;
            case "/quizlist":
                title = "Our Quizes";
                break;

            case "/adminquizlist" :
                title = "Admin - Our Quizes";
                break;

            case "/adminquizstart":
                title = "Create Quiz";
                break;


            case "/adminquiz":
                title = "Start Quiz";
                break;

            case "/adminquestiponanswer":
                title = "Questions and Answers";
                break;

            default:
                title = "Home";
                break;
        }
        return title;
}

function GetHeading() {
    let heading = "Home";
    const location = useLocation();
    //console.log(location);
    switch (location.pathname) {

        case "/":
            heading = "Welcome to QuizMania!";
            break;
        case "/quizlist":
            heading = "View Our Quizes";
            break;

        case "/adminquizlist":
            heading = "Admin - View Our Quizes";
            break;

        case "/adminquizstart":
            heading = "Quiz Creator";
            break;


        case "/adminquiz":
            heading = "Quiz Starter";
            break;

        case "/adminquestiponanswer":
            heading = "Questions and Answers";
            break;

        default:
            heading = "Home";
            break;
    }
    return heading;
}

function App() {


    //const { token, setToken } = useToken();

    //if (!token)
    //    return <Login setToken={setToken}></Login>;
     
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
                                    <Aside Heading={GetHeading()} Title={GetTitle()}></Aside>
                                    <Layout>
                                        {/*<Route exact path='/' component={(e) => <Home  {...e} />} />*/}
                                        {/*<Route path='/counter' component={(e) => <Counter  {...e} />} />*/}
                                        {/*<Route path='/startquizpage' component={(e) => <StartQuizPage {...e} />} />*/}
                                        {/*<Route path='/quizlist' component={(e) => <QuizList {...e} />} />*/}
                                        {/*<Route path='/endquizpage' component={(e) => <EndQuizPage />} />*/}
                                        {/*<Route path='/quiz' component={(e) => <Quiz {...e} />} />*/}
                                        {/*<Route path='/adminquizstart' component={(e) => <AdminQuizStart {...e} />} />*/}
                                        {/*<Route path='/adminquiz' component={(e) => <AdminQuiz  {...e} />} />*/}
                                        {/*<Route path='/adminquizlist' component={(e) => <AdminQuizList  {...e} />} />*/}
                                        {/*<Route path='/adminquizcreated' component={(e) => <AdminQuizCreated  {...e} />} />*/}
                                        {/*<Route path='/adminquestiponanswer' component={(e) => <AdminQuestionAnswer  {...e} />} />*/}
                                        {/*<Route path='/fetch-data' component={FetchData} />*/}
                                        {/*<Route path='/dataload' component={DataLoaderService} />*/}
                                        <AuthorizeRoute  path='/startquizpage' component={(e) => <StartQuizPage {...e} />} />
                                        <AuthorizeRoute  path='/quizlist' component={(e) => <QuizList {...e} />} />
                                        <AuthorizeRoute  path='/endquizpage' component={(e) => <EndQuizPage  />}  />
                                        <AuthorizeRoute  path='/quiz' component={(e) => <Quiz {...e} />} />
                                        <AuthorizeRoute  path='/adminquizstart' component={(e) => <AdminQuizStart {...e}   />}   />
                                        <AuthorizeRoute  path='/adminquiz' component={(e) => <AdminQuiz  {...e}  />}   />
                                        <AuthorizeRoute  path='/adminquizlist' component={(e) => <AdminQuizList  {...e} />}  />
                                        <AuthorizeRoute  path='/adminquizcreated' component={(e) => <AdminQuizCreated  {...e} />}    />
                                        <AuthorizeRoute  path='/adminquestiponanswer' component={(e) => <AdminQuestionAnswer  {...e}   />}    />
                                        <AuthorizeRoute  path='/fetch-data'      component={FetchData} />
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