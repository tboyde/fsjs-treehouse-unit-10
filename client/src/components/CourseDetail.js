import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'; 
import {useParams, useNavigate, Link } from 'react-router-dom'; 

const CourseDetail = ({ context }) => { 

    const currentUser  = context.authenticatedUser; //authenticated credentials that are referenced for view select fields (update, delete) on this page 
    const redirectTo = useNavigate(); 
    const { id } = useParams(); 
    const [ course, setCourse ] = useState(''); 

    useEffect(()=>{
        context.data
            .getCourse(id)
            //Checking to see if course exists. If not, then it redirects user to 404 / NotFound page
            .then(course => {
                if (course){
                    setCourse(course)
                } else {
                    redirectTo('/notfound'); 
                }
            })
            .catch((err) => {
                    console.log(`Sorry, there seems to be an error with finding a course with the id of ${id}. `)
                    redirectTo('/error')
                }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //handles the deletion of courses inside of course detail page
    const courseDelete = () => {
        context.data.deleteCourse(id, currentUser)
            .then(() => { redirectTo('/') })
            .catch((err) => {
                console.error(err); 
                redirectTo('/error')
            }); 
    }; 
       return(
        <>
        <main>
        <div className="actions--bar">
            <div className="wrap">
            { currentUser?.emailAddress === course.courseOwner?.emailAddress ? (
                    <>
                     <Link className='button' to={`/courses/${course.id}/update`}>Update Course</Link> 
                     <Link className='button' to='/' onClick={()=>{courseDelete(id)}}>Delete Course</Link> 
                    </>
                ) : null
            }
                <Link className='button button-secondary' to='/'> Return to List</Link>
            </div>
        </div>

        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>{`By: ${course.courseOwner?.firstName} ${course.courseOwner?.lastName}`}</p>
                    <ReactMarkdown>{course.description}</ReactMarkdown>
                    </div>
                    <div>
                    {course.estimatedTime ? (
                        <>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>
                        </>
                    ): null
                    }
                    {course.materialsNeeded ? (
                        <>
                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ReactMarkdown className='course--detail--list'>{course.materialsNeeded}</ReactMarkdown>
                        </>
                    ): null }
                    </div>
                </div>
            </form>
        </div>
    </main>
    </>
    )
}

export default CourseDetail;

