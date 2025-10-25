import React, {  useState} from 'react';
import { Routes, Router, Route } from 'react-router-dom';
//import {  } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Quiz } from './components/Quiz'
/*import { ProgressBar } from 'react-bootstrap';*/
import { DataLoaderService } from './components/DataLoaderService'
import { AdminQuestionAnswer } from './components/AdminQuestionAnswer'
import { AdminQuiz } from './components/AdminQuiz'
import { AdminQuizStart } from './components/AdminQuizStart'
import { AdminQuizCreated } from './components/AdminQuizCreated'
import { AdminQuizList } from './components/AdminQuizList'
import { StartQuizPage } from './components/StartQuizPage'
import { EndQuizPage } from './components/EndQuizPage'
import { QuizList } from './components/QuizList'
import { ScoreBoard } from './components/ScoreBoard'
import { Aside } from './components/Aside'
import { Login } from './components/Login'
import { Register } from './components/register';
import { Logo } from './components/Logo'
import { useToken } from './components/useToken'
/*import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';*/
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';

import './styles/custom.css'
import './styles/login.css'
import './styles/shortcodes.css'



function App() {

    //select login vs register page
    const [registerPageSelected, setregisterPageSelected] = useState(false);

    const { token, setToken, clearToken } = useToken();
    if (!token) {

        if (registerPageSelected)
            return <Register clearToken={clearToken} token={token} setToken={setToken} setregisterPageSelected={setregisterPageSelected}></Register>
        else
            return <Login clearToken={clearToken} token={token} setToken={setToken} setregisterPageSelected={setregisterPageSelected}></Login>
    }

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
                                        
                                        <Routes>
                                            <Route exact path='/' element={<Home />} />
                                            <Route path='/counter' element={<Counter clearToken={clearToken} />} />
                                            {/*<Route path='/startquizpage' render={(props) => <StartQuizPage {...props} clearToken={clearToken} />} />*/}
                                            <Route path='/startquizpage/:id/:name' element={ <StartQuizPage clearToken={clearToken} />} />
                                            {/*<Route path="/startquizpage" component={Wrapper} />*/}
                                            <Route path='/quizlist' element={<QuizList clearToken={clearToken} />} />
                                            <Route path='/endquizpage' element={<EndQuizPage clearToken={clearToken} />} />
                                            <Route path='/quiz/:id/:name' element={<Quiz clearToken={clearToken} />} />
                                            <Route path='/scoreboard' element={<ScoreBoard clearToken={clearToken} />} />
                                            <Route path='/adminquizstart' element={<AdminQuizStart clearToken={clearToken} />} />
                                            <Route path='/adminquiz/:id/:name' element={<AdminQuiz clearToken={clearToken} />} />
                                            <Route path='/adminquizlist' element={<AdminQuizList clearToken={clearToken} />} />
                                            <Route path='/adminquizcreated' element={<AdminQuizCreated clearToken={clearToken} />} />
                                            <Route path='/adminquestiponanswer' element={<AdminQuestionAnswer clearToken={clearToken} />} />
                                            <Route path='/fetch-data' element={FetchData} />
                                            <Route path='/dataload' element={DataLoaderService} />
                                        {/*<AuthorizeRoute  path='/startquizpage' component={(e) => <StartQuizPage {...e} />} />*/}
                                        {/*<AuthorizeRoute  path='/quizlist' component={(e) => <QuizList {...e} />} />*/}
                                            <Route path={ApplicationPaths.ApiAuthorizationPrefix} element={ApiAuthorizationRoutes} />
                                        </Routes>
                                     
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