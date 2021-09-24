import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

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
                props.list.map((q,index) => {
                    return <div className="col-md-6" key={q.id}>
                        <NavLink key={q.id} tag={Link} className="button"
                            to={{
                                pathname: '/startquizpage',
                                state: { id: q.id, name: q.name },
                            }}>
                            <div key={q.id} className="box_feat" id={"icon_" + GetImageIndex(index)}>
                                <h3 className="mt-3 black"><b>{q.name}</b></h3>
                                <div className="quizinfo">
                                    <span className="mr-2">Questions <span className="color-black">{q.questions.length}</span></span>
                                    <div>Answers <span className="color-black">{GetAnswerCount(q.questions)}</span></div>
                                    <div>Attempts <span className="color-black">{q.attempts}</span></div>
                                    <div>Best Score <span className="color-black">45%</span></div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                })
            }
        </div>

}

export const QuizList = (props) => {

    const [list, setlist] = useState([]);
    useEffect(() => {
        LoadQuizes(setlist);
        props.updatetext('QuizList');
    }, []);

    return <div>
        <h3 className="text-center">Start a Quiz!</h3>
        <Quizes list={list} {...props} />
    </div>

}