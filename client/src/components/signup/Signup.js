import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css';
import validation from '../Validation';

function Signup() {


    // Storing Form Field Values
    const [formValues, setFormValues] = useState({ username: "", email: "", password: "" });

    // Manage Form Error Values
    const [formErrorValues, setFormErrorValues] = useState({});

    //Manage API Errors
    const [error, setError] = useState(false);

    // Flag for Form Submission Status
    const [isSubmit, setIsSubmit] = useState(false);

    // Manage Field Change
    const handleChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target; //destructuring
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }

    // Manage Form Refresh
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrorValues(validation(formValues));
        setIsSubmit(true);
    }

    //Successful Validation
    useEffect(() => {
        if (Object.keys(formErrorValues).length === 0 && isSubmit) {
            // alert("success");
            setError(false);
            const saveArticle = async () => {
                try {
                    const response = await axios.post("/auth/signup", formValues);
                    if (response.data) {
                        alert("Registration Successfull!");
                        window.location.replace("/login");
                    }

                } catch (error) {
                    setError(true);
                }
            };
            saveArticle();
        }
    }, [formErrorValues]);

    return (
        <div className='signupBody'>
            <div className="main">
                {/* <input type="checkbox" id="chk" aria-hidden="true" /> */}
                {/* Signup */}
                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <div className='formData'>
                            <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                            <p className='error'>{formErrorValues.username}</p>
                            <input type="email" name="email" placeholder="Email" required="" value={formValues.email} onChange={handleChange} />
                            <p className='error'>{formErrorValues.email}</p>
                            <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                            <p className='error'>{formErrorValues.password}</p>
                        </div>

                        <button type="submit">Sign up</button>
                        {error && <span style={{ color: "red", marginLeft: "85px" }}>Something went wrong!</span>}

                        <div className="loginLab">
                            <h6 className='loginReg'>Already a member?<Link to='/login' className="loginReg">Login Now</Link></h6>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;