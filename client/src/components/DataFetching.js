import React, { useState, useEffect } from 'react'; 

function DataFetching (){
    //sets state for titles that will be retrieved from REST API
    const [titles, setTitles] = useState([])

    //here, the fetch method will be used to make a request to the REST API, convert the response to JSON, and then add that converted info ino the 'titles' array. Otherwise, an error will be logged to the console. 
    useEffect( () => {
        fetch('http://localhost:5000/api/courses')
        .then(res => res.json())
        .then(titles => setTitles(titles))
        .catch(err => console.log('Oh noes!', err))
    },[])

    return (
        <div>
            <ul>
                { titles.map(title => (
                    <li key={title.id}>{title.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default DataFetching; 