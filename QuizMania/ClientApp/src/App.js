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

import { Aside } from './components/Aside'
import { Login } from './components/Login'
import { Logo } from './components/Logo'
import { useToken } from './components/useToken'

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';

import './styles/custom.css'
import './styles/login.css'
import './styles/shortcodes.css'


function App() {


    const { token, setToken, clearToken } = useToken();
    //console.log(token);
    if (!token)
        return <Login clearToken={clearToken} token={token} setToken={setToken}></Login> 
     
    return (
        <div>
            <div id="loader_form">
                <div data-loader="circle-side-2" />
            </div>
            <div id="main_container" className="visible">
                <Logo clearToken={clearToken} token={token} setToken={setToken} />
                <div className="wrapper_in">
                    <div className="container-fluid">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" >
                                <div className="subheader" id="quote" />
                                <div className="row">
                                    <Aside></Aside>
                                    <Layout>
                                        <Route exact path='/' component={(e) => <Home  {...e} />} />
                                        <Route path='/counter' component={(e) => <Counter  {...e} />} />
                                        <Route path='/startquizpage' component={(e) => <StartQuizPage {...e} />} />
                                        <Route path='/quizlist' component={(e) => <QuizList {...e} />} />
                                        <Route path='/endquizpage' component={(e) => <EndQuizPage />} />
                                        <Route path='/quiz' component={(e) => <Quiz {...e} />} />
                                        <Route path='/adminquizstart' component={(e) => <AdminQuizStart {...e} />} />
                                        <Route path='/adminquiz' component={(e) => <AdminQuiz  {...e} />} />
                                        <Route path='/adminquizlist' component={(e) => <AdminQuizList  {...e} />} />
                                        <Route path='/adminquizcreated' component={(e) => <AdminQuizCreated  {...e} />} />
                                        <Route path='/adminquestiponanswer' component={(e) => <AdminQuestionAnswer  {...e} />} />
                                        <Route path='/fetch-data' component={FetchData} />
                                        <Route path='/dataload' component={DataLoaderService} />
                                        {/*<AuthorizeRoute  path='/startquizpage' component={(e) => <StartQuizPage {...e} />} />*/}
                                        {/*<AuthorizeRoute  path='/quizlist' component={(e) => <QuizList {...e} />} />*/}
                                        {/*<AuthorizeRoute  path='/endquizpage' component={(e) => <EndQuizPage  />}  />*/}
                                        {/*<AuthorizeRoute  path='/quiz' component={(e) => <Quiz {...e} />} />*/}
                                        {/*<AuthorizeRoute  path='/adminquizstart' component={(e) => <AdminQuizStart {...e}   />}   />*/}
                                        {/*<AuthorizeRoute  path='/adminquiz' component={(e) => <AdminQuiz  {...e}  />}   />*/}
                                        {/*<AuthorizeRoute  path='/adminquizlist' component={(e) => <AdminQuizList  {...e} />}  />*/}
                                        {/*<AuthorizeRoute  path='/adminquizcreated' component={(e) => <AdminQuizCreated  {...e} />}    />*/}
                                        {/*<AuthorizeRoute  path='/adminquestiponanswer' component={(e) => <AdminQuestionAnswer  {...e}   />}    />*/}
                                        {/*<AuthorizeRoute  path='/fetch-data'      component={FetchData} />*/}
                                        {/*<AuthorizeRoute path='/dataload'        component={DataLoaderService} />*/}
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