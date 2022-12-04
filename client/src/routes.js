import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Forbidden';

export const routes = [
    { path: '/', element: () => <Courses /> }, 
    { path: '/course/create', element: () => <CreateCourse /> }, 
    { path: '/courses/:id/update', element: () => <UpdateCourse /> }, 
    { path: '/courses/:id', element: () => <CourseDetail /> }, 
    { path: '/signin', element: () => <UserSignIn /> }, 
    { path: '/signup', element: () => <UserSignUp /> }, 
    { path: '/signout', element: () => <UserSignOut /> }, 
    { path: '/error', element: () => <Error /> }, 
    { path: '/forbidden', element: () => <Forbidden /> }, 
    { path: '*', element: () => <NotFound /> }
]


// credit to @eggtart_prince for this method of organizing routes. Found at https://www.reddit.com/r/reactjs/comments/upk64g/how_do_you_organize_your_routes_using_react_router/