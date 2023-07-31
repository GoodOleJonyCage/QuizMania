/*import React from 'react';*/

export const userNameStore = () => {

    const setUsername = (username) => {

        localStorage.setItem('username', JSON.stringify(username));
    }

    const getUsername = () => {

        let usernamestr = localStorage.getItem('username');
        if (usernamestr) {
            let username = JSON.parse(usernamestr);
            return username;
        }
        return null;
    }

    const clearUsername = () => {

        localStorage.setItem('username', null);
    }

    return {
        setUsername: setUsername,
        getUsername: getUsername,
        clearUsername: clearUsername
    }
}