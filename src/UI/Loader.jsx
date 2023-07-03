import React from 'react';

const Loader = () =>{
    return(
        <div className="text-center text-primary">
            <h1 className="sr-only">Loading...</h1>
            <div className="spinner-border" role="status">
            </div>
        </div>
    );
}

export default Loader;