import React, {  useEffect, useState } from 'react'
import {   NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoadAdminQuizes } from './Services'
import { LoadingDiv } from './LoadingDiv'
import { RandomImageGenerator } from './RandomImageGenerator'

export const Quizes = (props) => {
    const { GetImageIndex } = RandomImageGenerator();
    
    return props.quizes.length === 0 ? <></> :
            <>
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
                    <button className="button">Edit Questions and Answers</button>
                </NavLink>
            </div>
            <div className="row">
                {
                    props.quizes.map((q, index) => {
                        return <div className="col-md-6" key={q.id}>
                            <NavLink key={q.id} tag={Link} className="button"
                                to={{
                                    pathname: '/adminquiz/' + q.id + '/' + q.name,
                                    state: { id: q.id, name: q.name },
                                }}>
                                <div key={q.id} className="box_feat" id={"icon_" + GetImageIndex(index)}>
                                    <h3 className="mt-3 black"><b>{q.name}</b></h3>
                                    <div className="quizinfo">
                                        <span className="mr-2">Questions <span className="color-black">{q.questionCount}</span></span>
                                        <div>Answers <span className="color-black">{q.answerCount}</span></div>
                                        <div>Attempts <span className="color-black">{q.attempts}</span></div>
                                        <div>Attendies <span className="color-black">{q.attendies}</span></div>
                                        <div>Best Score <span className="color-black">{q.bestScore}%</span></div>
                                        <div>Average Score <span className="color-black">{q.averageScore}%</span></div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    })
                }
            </div>
            </>
}

export const AdminQuizList = (props) => {

    const [error, seterror] = useState('');
    const [quizes, setquizes] = useState([]);

    const LoadData = async (/*abortController*/) => {
        try {
            const vm = await LoadAdminQuizes(/*abortController*/);
            if (vm)
                setquizes(vm);
        }
        catch (response) {
            if (response.status === 401)
                props.clearToken();

            if (response.status === 403)
                seterror("Unauthorized Access");

            seterror(response.statusCode);
            //console.log(response);
            
        }
    }

    useEffect(() => {
        //let isMounted = true;
        //if (isMounted)
        //const abortController = new AbortController();
        LoadData(/*abortController*/);
        /*return () => { console.log("fetch call aborted!"); abortController.abort();*//*isMounted = false*//* };*/
    }, []);

    return <div>
        {
            error.length === 0 && quizes.length === 0 ? <LoadingDiv></LoadingDiv> :
                    <Quizes quizes={quizes} />
                }
                <div className="largeandbold">{error}</div>
            </div>

}