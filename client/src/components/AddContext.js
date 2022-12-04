import withContext from "../Context";

import { Courses, 
    CreateCourse, 
    CourseDetail, 
    Header, 
    UpdateCourse, 
    UserSignIn,  
    UserSignOut } from './components/';


    //Context is added to the neccessary, respective components
    const CourseWithContext = withContext(Courses); 
    const CreateCourseWithContext = withContext(CreateCourse); 
    const CourseDetailWithContext = withContext(CourseDetail); 
    const UpdateCourseWithContext = withContext(UpdateCourse); 
    const UserSignInWithContext = withContext(UserSignIn); 
    const UserSignOutWithContext = withContext(UserSignOut); 
    const HeaderWithContext = withContext(Header); 

//exports newly added context components
export {
    CourseWithContext, 
    CreateCourseWithContext, 
    CourseDetailWithContext, 
    HeaderWithContext, 
    UpdateCourseWithContext, 
    UserSignInWithContext, 
    UserSignOutWithContext
}; 

