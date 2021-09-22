﻿import React, { Component, useEffect, useState } from 'react'
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

export const Quizes = (props) => {

    return <div className="row">
            {
                props.list.map(q => {
                    return <div className="col-md-6" key={q.id}>
                        <NavLink key={q.id} tag={Link} className="button"
                            to={{
                                pathname: '/startquizpage',
                                state: { id: q.id, name: q.name },
                            }}>
                            <div key={q.id} className="box_feat"  >
                                <h3 className="mt-3 black"><b>{q.name}</b></h3>
                                <p>
                                    Question : {q.questions.length} , Answer : {GetAnswerCount(q.questions)}
                                </p>
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