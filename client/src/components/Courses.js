import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Courses = ({ context }) => {
    //sets the state of the 'courses' pull from the REST API and provides name to 'useNavigate()' method. 
    const [ courses, setCourses ] = useState([]); 
    const redirectTo = useNavigate(); 

    useEffect(()=>{
        context.data
            .getCourses()
            //Adds retrived courses to courses array with 'setCourses' 
            .then((courses) => setCourses(courses))
            .catch((err) => {
                    console.log('Sorry, theres seems to be some type of error', err)
                    redirectTo('/error')
                }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

       return (
        <>
        <main>
            <div className="wrap main--grid">
            {courses.map(course => (
                <Link key={course.id} className='course--module course--link' to={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            ))}
                <Link className="course--module course--add--module" to={`/courses/create`}>
                <span className="course--add--title">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 13 13"
                    className="add"
                >
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>
          New Course
                </span>
                </Link>
            </div>
        </main>
</>

       )
   }; 

export default Courses;

