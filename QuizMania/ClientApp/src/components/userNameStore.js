
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

    const getJwtToken = () => {

        let tokenstr = localStorage.getItem('token');
        if (tokenstr) {
            const usertoken = JSON.parse(tokenstr);
            return usertoken;
        }
        return null;
    }

    const isAdmin = () => {

        let tokenstr = localStorage.getItem('token');
        if (tokenstr) {

            let jwtData = tokenstr.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);

            let roles = []
            Object.keys(decodedJwtData)
                .forEach(key => {
                    if (key.match(/.*role$/)) { roles = decodedJwtData[key] }
                })
            //console.log(roles);
            return roles === "Admin";
        }
        return false;
    }

    //const isLoggedIn = () => {

    //    let tokenstr = localStorage.getItem('token');
    //    console.log(tokenstr);
    //    if (!tokenstr) {
    //        return false;
    //    }
    //    return true;
    //}

    return {
        isAdmin: isAdmin,
        getJwtToken: getJwtToken,
        setUsername: setUsername,
        getUsername: getUsername,
        clearUsername: clearUsername
    }
}