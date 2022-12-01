import React, { useState, useEffect } from 'react'; 

function DataFetching (){
    const [titles, setTitles] = useState([])

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