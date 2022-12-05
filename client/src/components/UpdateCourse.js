/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = ({ context }) => {
    //setting initial state for validation errors 
    const [valErrs, setValErrs ] = useState([]); 

    const currentUser = context.authenticatedUser; 
    const redirectTo = useNavigate(); 
    const { id } = useParams(); 

    //references of fields that are required when user updates the course
    const description = useRef(); 
    const estimatedTime = useRef(); 
    const materialsNeeded = useRef(); 
    const title = useRef(); 

    useEffect(()=>{
        context.data
        .getCourse(id)
        .then(course => {
            if (!course){
                redirectTo('/notfound'); 
            } else {
                if (course.courseOwner.id !== currentUser.id){
                    redirectTo('/forbidden')
                } else {
                //sets default value once update form is opened
                title.current.value = course.title
                description.current.value = course.description
                estimatedTime.current.value = course.estimatedTime
                materialsNeeded.current.value = course.materialsNeeded
            }}; 
        }); 
    }); 

    const submitHandler = async (e) => {
        e.preventDefault(); 

        const course = {
            title: title.current.value, 
            description: description.current.value, 
            estimatedTime: estimatedTime.current.value, 
            materialsNeeded: materialsNeeded.current.value,
        }

        await context.data
        .updateCourse(id, course, currentUser.emailAddress, currentUser.password)
        //if errors are present, then the errors will be added to the validated errors array. Otherwise, users will be redirected back to the index page
        .then((errors) => (errors ? setValErrs(errors) : redirectTo('/')))
        .catch((err) => {
            console.log(err); 
            redirectTo('/error')
        }); 
    }; 

    const cancelHandler = (e) => {
        e.preventDefault(); 
        redirectTo('/')
    }

       return (
        <>
        <main>
            <div className='wrap'>
                <h2>Update Course</h2>
                <form onSubmit={submitHandler}>
                { valErrs ? (
                    <div className='validation--errors'>
                        <h3>Validation Errors</h3>
                        <ul>
                            {valErrs.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div> 
                    ) : null 
                }
                <div className='main--flex'>
                    <div>
                    <label htmlFor='courseTitle'>Course Title</label>
                    <input
                        id='courseTitle'
                        name='courseTitle'
                        type='text'
                        ref={title}
                    />
                    <p>By Joe Smith</p>
                    <label htmlFor='courseDescription'>Course Description</label>
                    <textarea
                        id='courseDescription'
                        name='courseDescription'
                        ref={description}
                       
                    />
                    </div>
                    <div>
                    <label htmlFor='estimatedTime'>Estimated Time</label>
                    <input
                        id='estimatedTime'
                        name='estimatedTime'
                        type='text'
                        ref={estimatedTime}
                    />
                    <label htmlFor='materialsNeeded'>Materials Needed</label>
                    <textarea
                        id='materialsNeeded'
                        name='materialsNeeded'
                       ref={materialsNeeded}
                    />
                    </div>
                </div>
                <button className='button' type='submit'>
                    Update Course
                </button>
                <button
                    className='button button-secondary'
                    onclick={cancelHandler}
                >
                    Cancel
                </button>
                </form>
            </div>
        </main>
        </>
       )
   }; 

export default UpdateCourse;

