import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = ({ context }) => {
    //sets initial value & state for validation erros
    const [valErrors, setValErrors ] = useState([]); 
    const currentUser = context.authenticatedUser; 

    //sets references that are required to build the course object 
    const description = useRef(); 
    const estimatedTime = useRef(); 
    const materialsNeeded = useRef(); 
    const title = useRef(); 

    const redirectTo = useNavigate()

    const submitHandler = (e) => {
        //prevents button from automatically submitting
        e.preventDefault(); 
        //all of the fields that will be used for the 'body' when creating the course
        const course = {
            title: title.current.value, 
            description: description.current.value,
            estimatedTime: estimatedTime.current.value, 
            materialsNeeded: materialsNeeded.current.value, 
        }; 

        context.data
            .createCourse(course, currentUser)
             //errors references validation errors returned in the response
            .then(errors =>(errors.length ? setValErrors(errors) : redirectTo('/'))) 
            .catch((err) => {
                console.log('Error related to course creation', err)
                redirectTo('/error'); 
            }); 
    }; 

    //When pressed this redirects user back to index
    const cancelHandler = (e) => {
        e.preventDefault(); 
        redirectTo('/')
    }

       return (
           <>
            <main>
                <div className='wrap'>
                    <h2>Create Course</h2>
                    {valErrors ? (
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {valErrors.map((error, index) => <li key={index}>{error}</li>)}
                            </ul>
                        </div>
                    ): null }
                    <form onSubmit={submitHandler}>
                        <div className='main--flex'>
                            <div>
                            <label htmlFor='courseTitle'>Course Title</label>
                            <input
                                id='courseTitle'
                                name='courseTitle'
                                type='text'
                                defaultValue=''
                                ref={title}
                            />
                            <p>{`By: ${currentUser.firstName} ${currentUser.lastName}`}</p>
                            <label htmlFor='courseDescription'>Course Description</label>
                            <textarea
                                id='courseDescription'
                                name='courseDescription'
                                defaultValue=''
                                ref={description}

                            />
                            </div>
                            <div>
                            <label htmlFor='estimatedTime'>Estimated Time</label>
                            <input
                                id='estimatedTime'
                                name='estimatedTime'
                                type='text'
                                defaultValue=''
                                ref={estimatedTime}
                            />
                            <label htmlFor='materialsNeeded'>Materials Needed</label>
                            <textarea
                                id='materialsNeeded'
                                name='materialsNeeded'
                                defaultValue={''}
                                ref={materialsNeeded}
                            />
                            </div>
                        </div>
                        <button className='button' type='submit'>
                            Create Course
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
   }

export default CreateCourse;