import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import style from './ComponentStyles/Header.module.css'


export const Header = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event: any) => {
        event.preventDefault();
        auth.logout();
        history.push('/login')
    };

    return (
        <>
            <nav className={style.navHeader}>
                <div>
                    <ul className={style.leftBlock}>
                        <li>
                            <div className="brand-logo">List of Build</div>
                        </li>
                    </ul>
                    <ul className="right">
                        <li><Link className={style.headerNavLink} to="/" onClick={logoutHandler}>Exit</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
};
