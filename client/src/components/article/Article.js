import React from 'react';
import { Link } from "react-router-dom";

import './Article.css';

function Article({ article }) {
    return (
        <div className="post">

            <div className="postInfo">
                <Link to={`/article/${article._id}`} className="articleLink">
                    <span className="postTitle">{article.title}</span>
                </Link>
                <p className="postDesc">{article.description}</p>
                <hr />
            </div>

        </div>

    );
}

export default Article; 