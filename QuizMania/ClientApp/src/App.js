import React, { Component } from 'react';
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

const Aside = () => {

    return <aside className="col-xl-3 col-lg-4">
        {/*<h2>{props.quiz.Name}</h2>*/}
        {/*<p className="lead">Quiz # {props.quiz.QuizNumber}</p>*/}
        <h2>History of Mankind</h2>
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

export default class App extends Component {

    static displayName = App.name;
  
    render() {
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
                                        <Aside />
                                        <Layout>
                                            <Route exact path='/' component={Home} />
                                            <Route path='/counter' component={Counter} />
                                            <AuthorizeRoute path='/startquizpage' component={StartQuizPage} />
                                            <AuthorizeRoute path='/endquizpage' component={EndQuizPage} />
                                            <AuthorizeRoute path='/quizlist' component={QuizList} />
                                            <AuthorizeRoute path='/quizstart' component={Quiz} />
                                            <AuthorizeRoute path='/adminquizstart' component={AdminQuizStart} />
                                            <AuthorizeRoute path='/adminquiz' component={AdminQuiz} />
                                            <AuthorizeRoute path='/adminquizlist' component={AdminQuizList} />
                                            <AuthorizeRoute path='/adminquizcreated' component={AdminQuizCreated} />
                                            <AuthorizeRoute path='/adminquestiponanswer' component={AdminQuestionAnswer} />
                                            <AuthorizeRoute path='/fetch-data' component={FetchData} />
                                            <AuthorizeRoute path='/dataload' component={DataLoaderService} />
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
}

//function App() {
//    return (
//        <div className="App">
//            <Button>
//                Disabled
//            </Button>

//        </div>
//    );
//}
//export default App;