import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Header.css';

function Header(props) {
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <div>
            <nav className="header">
                <h2 className="logo">BLOG</h2> {/* JSX*/}
                <div className="headerTitles">
                    <Link className="headerLink" to="/">Home</Link>
                    {/* <Link className="headerLink" to="/about">About</Link> */}
                    {user && <Link className="headerLink" to="/add-article">Add Article</Link>}
                    {user && <span className="headerLink" onClick={handleLogout}>Logout</span>}
                    {!user && <Link className="headerLink" to="/login">Login</Link>}
                    {!user && <Link className="headerLink" to="/signup">Signup</Link>}


                </div>
            </nav>
        </div>
    );
}

export default Header;