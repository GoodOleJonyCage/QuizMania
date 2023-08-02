import React from 'react'

export const SectionHeadings = () => {

    const GetScoreBoardHeading = () => {

        return <div className="container row">
                    <div className="mt-auto">
                        <h2>ScoreBoard</h2>
                    </div>
                    <div className="font-icon-detail ml-auto "><span className="pe-7s-note2"></span></div>
                </div>;
    }

    return {

        GetScoreBoardHeading: GetScoreBoardHeading 
    }
}