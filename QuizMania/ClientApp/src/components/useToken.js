import { useState } from 'react';

export const useToken = () => {

    const getToken = () => {
        let tokenstr = localStorage.getItem('token');
        //console.log(tokenstr);
        try {
            if (tokenstr) {
                const usertoken = JSON.parse(tokenstr);
                return usertoken;
            }
        } catch (e) {
            return null;
        }
        
        return null;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        //custom logic
        localStorage.setItem('token', JSON.stringify(token));
        setToken(token);
    }

    const clearToken = () => {
        localStorage.setItem('token', null);
        setToken('');
    }

    return {
        clearToken: clearToken,
        setToken: saveToken,
        token
    }
}