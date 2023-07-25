import React  from 'react';
import { NavMenu } from './NavMenu';

export const Logo = () => {
    return <div id="header_in">
            <div id="logo_in"><a href="index.html"><img src="img/logo_black.png" width={160} height={48} alt="Quote" /></a></div>
            <NavMenu />
            </div>;
}