import React, { Component, useState, useEffect } from 'react';

export const Aside = (props) => {

    return (
        <aside className="col-xl-3 col-lg-4">
            <h2>{props.Heading}</h2>
            <p className="lead">{props.Title}</p>
            <ul className="list_ok">
                <li>Please select at least one correct answer.</li>
                <li>Use the Next button to proceed forward.</li>
                <li>Use the Back button to move backwards.</li>
            </ul>
        </aside>
    );

}