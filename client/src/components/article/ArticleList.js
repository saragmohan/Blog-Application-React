import React from 'react';
import Article from './Article';
import './ArticleList.css';


function ArticleList({ articles }) {
    return (
        <div className='articleListPage'>
            <div className='articleListTitle'>
                <h1>Aricle List</h1>
            </div>
            <div className='articlesList'>
                {articles.map((p) => (
                    <Article article={p} />
                ))}
            </div>


        </div>

    );
}

export default ArticleList;