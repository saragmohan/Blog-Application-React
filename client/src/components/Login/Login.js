import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Login.css';

function Login(props) {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <div className='loginPage'>
            <div className="loginBox">
                <form onSubmit={handleSubmit}>
                    <label for="chk" className='loginTitle' aria-hidden="true">Login</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        required=""
                        ref={userRef}
                    />
                    <input
                        type="password"
                        name="pswd"
                        placeholder="Password"
                        required=""
                        ref={passwordRef}
                    />
                    <button type="submit" disabled={isFetching}>Login</button>
                    <h6>Not a member?<Link to='/signup' className="logReg">Signup Now</Link></h6>
                </form>
            </div>
        </div >
    );
}

export default Login;