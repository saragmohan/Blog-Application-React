import React, { useEffect, useState } from 'react';
import ArticleList from '../article/ArticleList';
import './Home.css';
import axios from "axios"
import { useLocation } from 'react-router-dom';



function Home(props) {
    const [articles, setArticles] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await axios.get("/articles" + search);
            setArticles(res.data)
        }
        fetchArticles();
    }, [search]);

    return (
        <div className='home pt-5'>
            <div className='container'>
                <h1 className='head pt-3'>Blog Application</h1>
                <br></br>
                <p className=' intro bg-dark bg-gradient p-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                </p>
                <ArticleList articles={articles} />
            </div>
        </div>
    );
}

export default Home;