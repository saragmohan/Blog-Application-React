import React from 'react';
import Computer from './computer.png'
import './Error.css';

function Error(props) {
    return (
        <div className="errorBody pt-5">
            <div className='image'>
                <img src={Computer} alt='error'></img>
            </div>
            <h1 className='errorTitle'>404:Page not found</h1>
        </div >
    );
}

export default Error;