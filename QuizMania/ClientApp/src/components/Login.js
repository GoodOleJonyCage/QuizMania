import React, { Component, useState } from 'react';
import { Logo } from './Logo'
import { LoginUser } from './Services'

export const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authresult, setauthresult] = useState('');
    const [submitted, setsubmitted] = useState(false);

    const handleSubmit = async (e) => {
        setauthresult('');
        setsubmitted(true);
        if (username.length > 0 && password.length > 0) {
            try {
                const token = await LoginUser(username, password);
                //console.log(token);
                props.setToken(token);
            } catch (e) {
                setauthresult('User Not Found');
                //console.log(e);
            }
        }
    }

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
                                <div className="login-form">
                                    <div className="font-icon-detail">
                                        <span className="pe-7s-user"></span>
                                    </div>
                                    <div className="container">
                                        <label htmlFor="uname"><b>Username</b></label>
                                        <input onChange={(e) => { setUsername(e.target.value) }}
                                            className={submitted && !username ? "highlight-required" : ""}
                                            type="text" placeholder="Enter Username" name="uname" required />
                                        <label htmlFor="psw"><b>Password</b></label>
                                        <input onChange={(e) => { setPassword(e.target.value) }}
                                            className={submitted && !password ? "highlight-required" : ""}
                                            type="password" placeholder="Enter Password" name="psw" required />
                                        <div className="text-center text-danger bold">{authresult}</div>
                                        <button
                                            onClick={handleSubmit}
                                            type="submit" className="btn_1 medium">Login</button>
                                        {/*<label>*/}
                                        {/*    <input type="checkbox"  name="remember" /> Remember me*/}
                                        {/*</label>*/}
                                    </div>
                                    {/*<div className="container">*/}
                                    {/*  <button type="button" className="cancelbtn">Cancel</button>*/}
                                    {/*  <span className="psw">Forgot password?</span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}