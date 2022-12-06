import React from 'react';

const NotFound = () => {
    //Default page when user looks for a resource that does not exist
    return(
        <>
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </main>
        </>
    )
}; 

export default NotFound; 