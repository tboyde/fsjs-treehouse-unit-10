import { Routes, Route } from 'react-router-dom';

 //this component (DataFetching) was only imported to test the connection between the REST API & the frontend
import DataFetching from './components/DataFetching';

//imported components 
// import Header from './components/Header';
// import UpdateCourse from './components/UpdateCourse';
// import CourseDetail from './components/CourseDetail';
// import Courses from './components/Courses';
// import CreateCourse from './components/CreateCourse';
// import UserSignIn from './components/UserSignIn';
// import UserSignUp from './components/UserSignUp';
// import UserSignOut from './components/UserSignOut';
// import NotFound from './components/NotFound';
// import Error from './components/Error';
// import Forbidden from './components/Forbidden';

// import { HeaderWithContext } from './components/AddContext';




const App = () => {
  return (
    <>
    <div className="App">
    <DataFetching />

    {/* <Routes>
    {routes.map((route, index) => 
      <Route exact path={route.path} render={route.component} key={index}/>
        )}
    </Routes> */}
    </div>
    </>
  );
}

export default App;
