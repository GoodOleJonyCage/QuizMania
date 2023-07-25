import { useState } from 'react';

export const useToken = () => {

    const getToken = () => {
        let tokenstr = localStorage.getItem('token');
        const usertoken = JSON.parse(tokenstr);
        return usertoken?.token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        //custom logic
        localStorage.setItem('token', JSON.stringify(token));
        setToken(token);
    }

    return {
        setToken: saveToken,
        token
    }
}