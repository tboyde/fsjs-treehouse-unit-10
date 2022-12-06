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
                if (course.courseOwner.id !== currentUser?.id){
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

    const submitHandler = (e) => {
        e.preventDefault(); 

        //builds the course object that will be passed into the updateCourse method
        const course = {
            title: title.current.value, 
            description: description.current.value, 
            estimatedTime: estimatedTime.current.value, 
            materialsNeeded: materialsNeeded.current.value,
        }

        //here, the update course method is applied and 
        context.data
        .updateCourse(id, course, currentUser)
        //if errors are present, then the errors will be added to the validation errors array. Otherwise, users will be redirected back to the index page
        .then(errors => ( //validation errors
            errors.length !== 0 ?  
            setValErrs( //sets validation errors with errors that are returned
                <>
                <div className='validation--errors'>
                    <h3>Validation Errors--*/</h3>
                    <ul>
                        {errors.map((error, index) =>(
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>   
                </>
            ) : redirectTo('/') //if there are no issues with the response, the user will be redirected to courses / index page
        ))
        .catch((err) => {
            console.log(err); 
            redirectTo('/error')
        }); 
    }; 

    //Closes user out of update screen and redirects them back to home page 
    const cancelHandler = (e) => {
        e.preventDefault(); 
        redirectTo(`/courses/${id}`); 
    }

       return (
        <>
        <main>
            <div className='wrap'>
                <h2>Update Course</h2>
                <form onSubmit={submitHandler}>
                {valErrs}
                <div className='main--flex'>
                    <div>
                    <label htmlFor='courseTitle'>Course Title</label>
                    <input
                        id='courseTitle'
                        name='courseTitle'
                        type='text'
                        ref={title}
                    />
                    <p>{`By: ${currentUser.firstName} ${currentUser.lastName}`}</p>
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
                    onClick={cancelHandler}
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

