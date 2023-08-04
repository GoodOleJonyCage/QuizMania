import React, { useEffect, useState } from 'react'
import { RandomImageGenerator } from './RandomImageGenerator'
import { LoadingDiv } from './LoadingDiv'
import { SectionHeadings } from './SectionHeadings'
import { LoadScoreBoard } from './Services'
import { QuestionAnswerUtility} from './QuestionAnswerUtility'

import Moment from 'react-moment';

const ScoreBoardQuizAttempts = (props) => {

    return props.attemptDetails.length === 0 ? <LoadingDiv></LoadingDiv> :
        <div className="mt-4">
            <table className="table table-striped table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>Attempt</th>
                        <th>Correctly Answered</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.attemptDetails.map((attempt, index) => {

                            return <tr key={attempt.attemptNum}>
                                    <td>{attempt.attemptNum}</td>
                                    <td>{attempt.correct}</td>
                                    <td>{attempt.score}%</td>
                                    <td><Moment format="DD MMM YYYY hh:mm:ss:A">{attempt.date}</Moment></td>
                                </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
}

 const ScoreboardQuiz = (props) => {

     const { GetImageIndex } = RandomImageGenerator();
     const { GetAnswerCount } = QuestionAnswerUtility();

     return props.quiz.attempts === 0 ? <></> :
         <div key={props.quiz.id} className="box_feat" id={"icon_" + GetImageIndex(props.quizindex)}>
             <h3 className="mt-3 black"><b>{props.quiz.name}</b></h3>
             <div className="quizinfo">
                 <span className="mr-2">Questions <span className="color-black">{props.quiz.questions.length}</span></span>
                 <div>Answers <span className="color-black">{GetAnswerCount(props.quiz.questions)}</span></div>
                 <div>Attempts <span className="color-black">{props.quiz.attempts}</span></div>
                 <div>Best Score <span className="color-black">{props.quiz.bestScore}%</span></div>
                 <div>Average Score <span className="color-black">{props.quiz.averageScore}%</span></div>
             </div>
             <ScoreBoardQuizAttempts key={props.quiz.id}  attemptDetails={props.quiz.attemptDetails} ></ScoreBoardQuizAttempts>
            </div>
}


export const ScoreBoard = (props) => {

    const [error, seterror] = useState('');
    const [quizes, setquizes] = useState([]);
    const { GetScoreBoardHeading } = SectionHeadings();

    const LoadData = async () => {
        try {
            const vm = await LoadScoreBoard();
            //console.log(vm);
            if (vm)
                setquizes(vm);

        } catch (response) {
            if (response.status === 401)
                props.clearToken();

            seterror(response.statusCode);
        }
    }

    useEffect(() => {
        LoadData();
    } ,[]);

    return <div className="container">
            {GetScoreBoardHeading()}
            {
            quizes.length === 0 ? <LoadingDiv></LoadingDiv> :
            quizes.map((quiz,quizindex) => {
                return <ScoreboardQuiz key={quiz.id} quiz={quiz} quizindex={quizindex} ></ScoreboardQuiz>
                })
            }
            <div className="largeandbold">{error}</div>
            </div>

}