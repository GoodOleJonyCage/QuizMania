import React, { Component } from 'react';
import { Collapse, Container, Navbar,  NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { userNameStore } from './userNameStore'

import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {

        const { getUsername,isAdmin } = userNameStore();
        var loggedIn = this.props.token?.length > 0;

        return (
            !loggedIn ? <></> :
            <header >
                <Navbar
                    className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        {/*<NavbarBrand tag={Link} to="/">QuizMaster</NavbarBrand>*/}
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/quizlist">Quiz</NavLink>
                                </NavItem>
                                    {
                                        !isAdmin() ? <></> :
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/adminquizlist">Admin</NavLink>
                                        </NavItem>
                                    }
                                    <NavItem><label className="text-dark nav-link">{getUsername()}</label>
                                </NavItem>
                                <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/"  onClick={() => { this.props.clearToken() }}>Logout</NavLink>
                                </NavItem>
                                {/*tied with asp.net authetication*/}
                                {/*<LoginMenu></LoginMenu>*/}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
