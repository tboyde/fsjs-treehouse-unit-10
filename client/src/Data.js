import apiBaseUrl from './config';

//this document contains the methods used to make GET, POST, PUT, And DELETE requests to the REST API
export default class Data {
  api ( path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    
    //if authorization is true, then user credentials will be encoded and that info will be added to the options header
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }


  //Retrieves all courses (GET)
  async getCourses(){
    const res = await this.api('/courses', 'GET'); 
    if (res.status === 200){
      return res.json().then((data) => data); 
    } else {
      throw new Error(); 
    }
  }

  //Retrieves user (GET)
  async getUser(emailAddress, password) {
    const res = await this.api(`/users`, 'GET', null, true, { emailAddress, password } );
    if (res.status === 200) {
      return res.json().then(data => data);
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error('Error: There was an issue processing this request with the server');
    }
  }

  //Creates a new user (POST)
  async createUser(user) {
    const res = await this.api('/users', 'POST', user);
    if (res.status === 201) {
      return [];
    } else if (res.status === 400) {
      //will return validation errors 
      return res.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error('Error: There was an issue processing this request with the server');
    }
  }

  //Creates a new course (POST)
  async createCourse(body, currentUser) {
    const res = await this.api(`/courses`, 'POST', body, true, currentUser);
    if (res.status === 201) {
      return [];
    } else if (res.status === 400) {
      return res.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error('Error: There was an issue processing this request with the server');
    }
  }

  //Finds courses (GET)
  async getCourse(id) {
    const res = await this.api(`/courses/${id}`, 'GET');
    if (res.status === 200) {
      return res.json().then(course => course);
    } else {
      throw new Error('Error: There was an issue processing this request with the server');
    }
  }

//Updates existing course (PUT)
async updateCourse(id, course, currentUser) {
  const res = await this.api(`/courses/${id}`, 'PUT', course, true, currentUser);
  if (res.status === 204) {
    return [];
  } else if (res.status === 400) {
    return res.json().then(data => {
      return data.errors
    });
  } else if (res.status === 404) {
    throw new Error("404");
  } else {
    throw new Error("505");
  }
;}

//Deletes course (DELETE)
async deleteCourse(id, currentUser) {
  const res = await this.api(`/courses/${id}`, 'DELETE', null, true, currentUser);
  if (res.status === 204) {
    return [];
  } else if (res.status === 401) {
    return null;
  } else {
    throw new Error();
  }
}
}
