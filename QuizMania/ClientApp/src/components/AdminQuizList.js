import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

//export const Quizes = (props) => {
    
//    return <div className="textcenter">
//            {
//                props.list.map(q => {
//                    return <div className="questionitem">
//                                <span>{q.name}</span>
//                                <NavLink tag={Link} className="button"
//                                    to={{
//                                        pathname: '/adminquiz',
//                                        state: { id: q.id, name: q.name },
//                                    }}>
//                                    <button className="button" type="button"><i className="icon-forward-2 text-success" />Edit</button>
//                                </NavLink>
//                            </div>
                    
//                })
//            }
//        </div>
//}

const GetAnswerCount = (questions) => {

    var count = 0;
    for (var q = 0; q < questions.length; q++) {
        for (var a = 0; a < questions[q].answers.length; a++) {
            count++;
        }
    }
    return count;
}

const GetImageIndex = (index) => {

    let value = (index + 1) % 4;
    console.log(value);
    if (value == 0)
        value = 4;
    return value;
}

export const Quizes = (props) => {

    return <div className="row">
        {
            props.list.map((q, index) => {
                return <div className="col-md-6" key={q.id}>
                    <NavLink key={q.id} tag={Link} className="button"
                        to={{
                            pathname: '/adminquiz',
                            state: { id: q.id, name: q.name },
                        }}>
                        <div key={q.id} className="box_feat" id={"icon_" + GetImageIndex(index)}>
                            <h3 className="mt-3 black"><b>{q.name}</b></h3>
                            <div className="quizinfo">
                                <span className="mr-2">Questions <span className="color-black">{q.questions.length}</span></span>
                                <div>Answers <span className="color-black">{GetAnswerCount(q.questions)}</span></div>
                                <div>Attempts <span className="color-black">{q.attempts}</span></div>
                                <div>Best Score <span className="color-black">{q.bestScore}%</span></div>
                                <div>Average Score <span className="color-black">{q.averageScore}%</span></div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            })
        }
    </div>

}

export const AdminQuizList = () => {

    const [list, setlist] = useState([]);

    useEffect(() => {
        LoadQuizes(setlist);
    }, []);

    return <div>
                <div className="text-center">
                    <NavLink tag={Link} className="button"
                        to={{
                    pathname: '/adminquizstart',
                    }}>
                        <button className="button">Create New Quiz</button>
                    </NavLink>
                    <NavLink tag={Link} className="button"
                        to={{
                            pathname: '/adminquestiponanswer',
                        }}>
                        <button className="button">Questions and Answers</button>
                    </NavLink>
                </div>
                <Quizes list={list} />
            </div>

}