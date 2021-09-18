import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

export const Quizes = (props) => {
    
    return <div className="text-center">
            {
                props.list.map(i => {
                    return <h5>{i.name}</h5>
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
        <Quizes list={list} />
        <NavLink tag={Link} className="button"
            to={{
                pathname: '/adminquizstart',
            }}> Create New Quiz </NavLink>
    </div>

}