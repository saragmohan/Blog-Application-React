import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import './SingleArticle.css';
import { Context } from '../../context/Context';


function SingleArticle(props) {
    const location = useLocation()
    const path = location.pathname.split("/")[2];

    const [article, setArticle] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/articles/" + path);
            setArticle(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/articles/${article._id}`, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) { }
    };


    const handleUpdate = async () => {
        try {
            await axios.put(`/articles/${article._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false)
        } catch (err) { }
    };

    return (
        <div className='articlePage pt-5'>
            <div className='container pt-4'>

                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="articleTitle articleTitleEdit"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (

                    <h1 className='articleTitle'>{article.title}
                    </h1>)}
                {/* {user?.role?.includes("admin")} */}
                {article.username === user?.username && (
                    <div className='articleEdit'>
                        <i className="articlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                        <i className="articlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                )}
                <br></br>
                {updateMode ? (
                    <textarea
                        className="articlePara articleParaEdit  p-3"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className='articlePara p-3'>{article.description}</p>
                )}
            </div>
            <div className='authorName'>
                <Link to={`/?user=${article.username}`} className="authorLink">
                    <h3>Author: {article.username}</h3>
                </Link>
            </div>

            {updateMode && (
                <button className="singleArticleButton" onClick={handleUpdate}>Update</button>
            )}

        </div>
    );
}

export default SingleArticle;