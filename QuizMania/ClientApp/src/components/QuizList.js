import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

export const Quizes = (props) => {

    return <div className="item-row">
        {
            props.list.map(q => {
                return <div className="questionitem" key={q.id}>
                        <span>{q.name}</span>
                        <NavLink tag={Link} className="button"
                            to={{
                                pathname: '/StartQuizPage',
                                state: { id: q.id, name: q.name },
                            }}>
                            <button className="button" type="button"><i className="icon-forward-2 text-success" />Start Quiz</button>
                        </NavLink>
                </div>

            })
        }
    </div>
}

export const QuizList = () => {

    const [list, setlist] = useState([]);

    useEffect(() => {
        LoadQuizes(setlist);
    }, []);

    return <div>
        <Quizes list={list} />
    </div>

}