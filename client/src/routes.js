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
    { path: '/', component: () => <Courses /> }, 
    { path: '/course/create', component: () => <CreateCourse /> }, 
    { path: '/courses/:id/update', component: () => <UpdateCourse /> }, 
    { path: '/courses/:id', component: () => <CourseDetail /> }, 
    { path: '/signin', component: () => <UserSignIn /> }, 
    { path: '/signup', component: () => <UserSignUp /> }, 
    { path: '/signout', component: () => <UserSignOut /> }, 
    { path: '/error', component: () => <Error /> }, 
    { path: '/forbidden', component: () => <Forbidden /> }, 
    { path: '*', component: () => <NotFound /> }
]


// credit to @eggtart_prince for this method of organizing routes. Found at https://www.reddit.com/r/reactjs/comments/upk64g/how_do_you_organize_your_routes_using_react_router/