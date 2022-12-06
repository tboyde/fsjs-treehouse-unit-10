import React from 'react';

const Forbidden = () => {
    //This page appears when a user is trying to access a resource that is not allowed 
    return(
        <>
         <main>
            <div className="wrap">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
            </div>
        </main>
        </>
    )
}; 

export default Forbidden; 