import React, { Component } from 'react';

class Courses extends Component {
    
   constructor(){
       super();

       this.state={
       }
   }
   render(){
       return (
        <>
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <a href="index.html">Courses</a>
                </h1>

                <nav>
                    <ul className="header--signedout">
                        <li>
                            <a href="sign-up.html">Sign Up </a>
                        </li>
                        <li>
                            <a href="sign-in.html">Sign In</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <main>
            <div className="wrap main--grid">
                <a className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">Build a Basic Bookcase</h3>
                </a>
                <a className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">Learn How to Program</h3>
                </a>
                <a className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">Learn How to Test Programs</h3>
                </a>
                <a
                    className="course--module course--add--module"
                    href="create-course.html"
                >
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
        </a>
    </div>
  </main>
</>

       )
   }
}
export default Courses;

