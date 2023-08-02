import React, { useEffect, useState } from 'react'
import { RandomImageGenerator } from './RandomImageGenerator'
import { LoadingDiv } from './LoadingDiv'
import { SectionHeadings } from './SectionHeadings'
import { LoadScoreBoard } from './Services'
import { QuestionAnswerUtility} from './QuestionAnswerUtility'

const ScoreBoardQuizAttempts = (props) => {

    return props.attempts === 0 ? <LoadingDiv></LoadingDiv> :
        <div className="mt-2">
            <table className="table table-striped table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>Attempt</th>
                        <th>Correct</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/*{*/}
                    {/*    props.attempts.map((attempt, index) => {*/}

                    {/*        return <tr>*/}
                    {/*            <td>{attempt}</td>*/}
                    {/*            <td>Jacob</td>*/}
                    {/*            <td>Thornton</td>*/}
                    {/*            <td>@fat</td>*/}
                    {/*        </tr>*/}
                    {/*    })*/}
                    {/*}*/}
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
             <ScoreBoardQuizAttempts attempts={props.quiz.attempts} ></ScoreBoardQuizAttempts>
            </div>
}


export const ScoreBoard = () => {


    const [quizes, setquizes] = useState([]);
    const { GetScoreBoardHeading } = SectionHeadings();

    const LoadData = async () => {
        const vm = await LoadScoreBoard();
        if (vm)
            setquizes(vm);
    }

    useEffect(() => {
        LoadData();
    },[]);

    return <div className="container">
            {GetScoreBoardHeading()}
            {
            quizes.length === 0 ? <LoadingDiv></LoadingDiv> :
            quizes.map((quiz,quizindex) => {

                return <ScoreboardQuiz key={quiz.id} quiz={quiz} quizindex={quizindex} ></ScoreboardQuiz>

                })
            }
            </div>

}