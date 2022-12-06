/* eslint-disable array-callback-return */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {routes} from './routes'; 
import { withContext }   from './Context';

 //this component (DataFetching) was only imported to test the connection between the REST API & the frontend
// import DataFetching from './components/DataFetching';

//imported components 
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import PrivateRoutes from './components/PrivateRoutes';

//adding context to components
const HeaderContext = withContext(Header); 
const CreateCourseWithContext = withContext(CreateCourse); 
const UpdateCourseWithContext = withContext(UpdateCourse); 
const PrivateRoutesWithContext = withContext(PrivateRoutes); 

const App = () => {
  return (
    <>
    <HeaderContext />
    <Routes>
      {routes.map((route, i) => (
        <Route path={route.path} element={route.component} key={i} />
      ))}
      <Route element={<PrivateRoutesWithContext/>}>
        <Route path='/courses/create' element={<CreateCourseWithContext/>} />
        <Route path='/courses/:id/update' element={<UpdateCourseWithContext/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
