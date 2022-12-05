import { withContext } from './Context';

//importing components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Forbidden';

//Adding context to components that require it for functionality 
const CoursesWithContext = withContext(Courses); 
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn); 
const UserSignUpWithContext = withContext(UserSignUp); 
const UserSignOutWithContext = withContext(UserSignOut); 


export const routes = [
    { path: '/', component: <CoursesWithContext /> }, 
    { path: '/courses/:id', component: <CourseDetailWithContext /> }, 
    { path: '/signin', component: <UserSignInWithContext /> }, 
    { path: '/signup', component: <UserSignUpWithContext /> }, 
    { path: '/signout', component: <UserSignOutWithContext /> }, 
    { path: '/error', component: <Error /> }, 
    { path: '/forbidden', component: <Forbidden /> }, 
    { path: '*', component: <NotFound /> }
]

// credit to @eggtart_prince for this method of organizing routes. Found at https://www.reddit.com/r/reactjs/comments/upk64g/how_do_you_organize_your_routes_using_react_router/