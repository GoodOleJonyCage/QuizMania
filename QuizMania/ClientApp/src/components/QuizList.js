import React, { Component, useEffect, useState } from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadQuizes } from './Services'

 

const GetImageIndex = (index) => {

    let value = (index + 1) % 4;
    if (value === 0)
        value = 4;
    return value;
}

export const Quizes = (props) => {

    return <div className="row">
        {
            props.quizes.length === 0 ? <div className="container text-center largeandbold">Loading...</div> :
                props.quizes.map((q, index) => {
                    return <div className="col-md-6" key={q.id}>
                        <NavLink key={q.id} tag={Link} className="button"
                            to={{
                                pathname: '/startquizpage',
                                state: { id: q.id, name: q.name },
                            }}>
                            <div key={q.id} className="box_feat" id={"icon_" + GetImageIndex(index)}>
                                <h3 className="mt-3 black"><b>{q.name}</b></h3>
                                <div className="quizinfo">
                                    <span className="mr-2">Questions <span className="color-black">{q.questionCount}</span></span>
                                    <div>Answers <span className="color-black">{q.answerCount}</span></div>
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

export const QuizList = (props) => {

    const [quizes, setquizes] = useState([]);

    const LoadData = async (/*abortController*/) => {
        const vm = await LoadQuizes(/*abortController*/);
        setquizes(vm);
    }

    useEffect(() => {
        //let isMounted = true;
        //if (isMounted)
        //const abortController = new AbortController();
        LoadData(/*abortController*/);
        //return () => { console.log("fetch call aborted!" ); abortController.abort();/*isMounted = false*/ };
    }, []);

    return <div>
                <h3 className="text-center">Start a Quiz!</h3>
                <Quizes quizes={quizes} {...props} />
            </div>

}