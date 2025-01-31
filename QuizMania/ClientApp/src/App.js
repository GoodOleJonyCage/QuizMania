import React, {  useState} from 'react';
import { Route } from 'react-router';
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
                                        <Route exact path='/' component={(e) => <Home  {...e} />} />
                                        <Route path='/counter' component={(e) => <Counter  {...e} clearToken={clearToken} />} />
                                        <Route path='/startquizpage' component={(e) => <StartQuizPage {...e} clearToken={clearToken} />} />
                                        <Route path='/quizlist' component={(e) => <QuizList {...e} clearToken={clearToken} />} />
                                        <Route path='/endquizpage' component={(e) => <EndQuizPage clearToken={clearToken} />} />
                                        <Route path='/quiz' component={(e) => <Quiz {...e} clearToken={clearToken} />} />
                                        <Route path='/scoreboard' component={(e) => <ScoreBoard {...e} clearToken={clearToken} />} />
                                        <Route path='/adminquizstart' component={(e) => <AdminQuizStart {...e} clearToken={clearToken} />} />
                                        <Route path='/adminquiz' component={(e) => <AdminQuiz  {...e} clearToken={clearToken} />} />
                                        <Route path='/adminquizlist' component={(e) => <AdminQuizList  {...e} clearToken={clearToken} />} />
                                        <Route path='/adminquizcreated' component={(e) => <AdminQuizCreated  {...e} clearToken={clearToken} />} />
                                        <Route path='/adminquestiponanswer' component={(e) => <AdminQuestionAnswer  {...e} clearToken={clearToken} />} />
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