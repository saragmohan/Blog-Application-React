import { useContext, useState } from 'react';
import axios from 'axios';
import './AddArticle.css';
import { Context } from "../../context/Context";


function AddArticle() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const { user } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newArticle = {
            username: user.username,
            title,
            desc,
        };

        const res = await axios.post("/articles/", newArticle);
        if (res.data) {
            alert("New Blog saved successfully!");
            window.location.replace("/article/" + res.data._id);
        }
        console.log(newArticle);
    }
    return (

        <div className='write'>
            <img className='writeImg' src='https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='road' ></img>
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    {/* <label htmlFor='fileInput'>
                        <i className="writeIcon fas fa-plus"></i>
                    </label> */}
                    {/* <input type="file" id="fileInput" style={{ display: "none" }} /> */}
                    <input
                        type="text"
                        placeholder='title' className="writeInput"
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus={true} />
                </div>
                <div className='writeFormGroup'>
                    <textarea
                        placeholder='Tell your story....' type='text'
                        className='writeInput writeText' onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <button className='writeSubmit' type="submit">Publish</button>
            </form>
        </div>
    );

}
export default AddArticle;