import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

export const Quizes = (props) => {

    return <ul className="list_ok">
        {
            props.list.map(q => {

                return <li className="quizitem" key={q.id}>
                    <span>{q.name}</span>
                    <NavLink tag={Link} className="button"
                        to={{
                            pathname: '/startquizpage',
                            state: { id: q.id, name: q.name  },
                        }}>
                        <button className="button" ><i className="icon-forward-2 text-success" />Start Quiz</button>
                    </NavLink>
                </li>
            })
        }
    </ul>
}

export const QuizList = (props) => {

    const [list, setlist] = useState([]);
    useEffect(() => {
        LoadQuizes(setlist);
        props.updatetext('QuizList');
    }, []);
    //LoadQuizes(setlist);
    return <div>
        <Quizes list={list} {...props}  />
    </div>

}