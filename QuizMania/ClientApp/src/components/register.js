import React, { useState } from 'react';
import { Logo } from './Logo'
import { RegisterUser } from './Services'
import { LoginUser } from './Services'
import { userNameStore } from './userNameStore'

export const Register = (props) => {

    const { setUsername, clearUsername } = userNameStore();

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [authresult, setauthresult] = useState('');
    const [submitted, setsubmitted] = useState(false);

    const handleSubmit = async (e) => {

        setauthresult('');
        setsubmitted(true);

         if (userID.length > 0 && password.length > 0) {
            try {
                const userRegistered = await RegisterUser(userID, password);
                if (userRegistered) {
                    try {
                        const token = await LoginUser(userID, password);
                        setUsername(userID);
                        props.setToken(token);
                    } catch (error) {
                        error.json().then((errorMessage) => {
                            //console.log(errorMessage);
                            setauthresult(errorMessage);
                        });
                    }
                }
                //props.setToken(token);
            } catch (error) {
                error.json().then((errorMessage) => {
                    //console.log(errorMessage);
                    setauthresult(errorMessage);
                });
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
                                        <span className="pe-7s-users"></span>
                                    </div>
                                    <div className="container m-auto">
                                        <h2>Register</h2>
                                    </div>
                                    <div className="container">
                                        <label htmlFor="uname"><b>Username</b></label>
                                        <input onChange={(e) => { setUserID(e.target.value) }}
                                            className={submitted && !userID ? "highlight-required" : ""}
                                            type="text" placeholder="Enter Username" name="uname" required />
                                        <label htmlFor="psw"><b>Password</b></label>
                                        <input onChange={(e) => { setPassword(e.target.value) }}
                                            className={submitted && !password ? "highlight-required" : ""}
                                            type="password" placeholder="Enter Password" name="psw" required />
                                        <div className="text-center text-danger bold">{authresult}</div>
                                        <div className="row m-auto">
                                            <div className="">
                                                <button
                                                    onClick={handleSubmit}
                                                    className="btn_1 medium">Register</button>
                                            </div>
                                            <div className="">
                                                <button
                                                    onClick={(e) => { props.setregisterPageSelected(false) }}
                                                    type="submit" className="btn_outline  ml-2">Login</button>
                                            </div>
                                        </div>
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