import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

export const Quizes = (props) => {
    
    return <div className="textcenter">
            {
                props.list.map(q => {
                    return <div className="questionitem">
                                <span>{q.name}</span>
                                <NavLink tag={Link} className="button"
                                    to={{
                                        pathname: '/adminquiz',
                                        state: { id: q.id, name: q.name },
                                    }}>
                                    <button className="button" type="button"><i className="icon-forward-2 text-success" />Edit</button>
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