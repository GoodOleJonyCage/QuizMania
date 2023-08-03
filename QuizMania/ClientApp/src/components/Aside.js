import React  from 'react';
import { useLocation } from "react-router-dom";

const GetTitle = () => {
    let title = "Home";
    const location = useLocation();
    //console.log(location);
    switch (location.pathname) {

        case "/":
            title = "Home";
            break;
        case "/quizlist":
            title = "Our Quizes";
            break;

        case "/adminquizlist":
            title = "Admin - Our Quizes";
            break;

        case "/adminquizstart":
            title = "Create Quiz";
            break;


        case "/adminquiz":
            title = "Start Quiz";
            break;

        case "/adminquestiponanswer":
            title = "Questions and Answers";
            break;

        default:
            title = "Home";
            break;
    }
    return title;
}

const GetHeading = () => {
    let heading = "Home";
    const location = useLocation();
    //console.log(location);
    switch (location.pathname) {

        case "/":
            heading = "Welcome to QuizMania!";
            break;
        case "/quizlist":
            heading = "View Our Quizes";
            break;

        case "/adminquizlist":
            heading = "Admin - View Our Quizes";
            break;

        case "/adminquizstart":
            heading = "Quiz Creator";
            break;


        case "/adminquiz":
            heading = "Quiz Starter";
            break;

        case "/adminquestiponanswer":
            heading = "Questions and Answers";
            break;

        default:
            heading = "Home";
            break;
    }
    return heading;
}

export const Aside = (props) => {

    return (
        <aside className="col-xl-3 col-lg-4">
            <h2>{GetHeading()}</h2>
            <p className="lead">{GetTitle()}</p>
            <ul className="list_ok">
                <li>Please select at least one correct answer.</li>
                <li>Use the Next button to proceed forward.</li>
                <li>Use the Back button to move backwards.</li>
            </ul>
        </aside>
    );

}