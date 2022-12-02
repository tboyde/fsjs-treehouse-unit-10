
import './App.css';

//this component (DataFetching) was only imported to test the connection between the REST API & the frontend
import DataFetching from './components/DataFetching';

//imported components 
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';



function App() {
  return (
    <div className="App">
    <Header />
      <DataFetching />
    </div>
  );
}

export default App;
