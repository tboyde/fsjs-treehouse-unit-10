import apiBaseUrl from './config';

export default class Data {
  api ( path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    
    //if authorization is true, then user credentials will be encoded and that info will be added to the options header
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }


  //Retrieves all courses (GET)
  async getCourses(){
    const allCourses = await this.api('/courses', 'GET'); 
    if (allCourses.status === 200){
      return allCourses.json().then((data) => data); 
    } else {
      throw new Error(); 
    }
  }

  //Retrieves user (GET)
  async getUser(username, password) {
    const foundUser = await this.api(`/users`, 'GET', null, true, { username, password } );
    if (foundUser.status === 200) {
      return foundUser.json().then((data) => data);
    } else if (foundUser.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //Creates a new user (POST)
  async createUser(user) {
    const newUser = await this.api('/users', 'POST', user);
    if (newUser.status === 201) {
      return [];
    } else if (newUser.status === 400) {
      return newUser.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //Creates a new course (POST)
  async createCourse(body, username, password) {
    const newCourse = await this.api(`/courses`, 'POST', body, true, { username, password });
    if (newCourse.status === 201) {
      return [];
    } else if (newCourse.status === 400) {
      return newCourse.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //Finds courses (GET)
  async getCourse(id) {
    const course = await this.api(`/courses/${id}`, 'GET');
    if (course.status === 200) {
      return course.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

//Updates existing course (PUT)
async updateCourse(id, body, username, password) {
  const updateCourse = await this.api(`/courses/${id}`, 'PUT', body, true, { username, password });
  if (updateCourse.status === 204) {
    return [];
  } else if (updateCourse.status === 400) {
    return updateCourse.json().then((data) => {
      return data.errors;
    });
  } else if (updateCourse.status === 404) {
    throw new Error("404");
  } else {
    throw new Error("505");
  }
;}

//Deletes course (DELETE)
async deleteCourse(id, username, password) {
  const removeCourse = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password });
  if (removeCourse.status === 204) {
    return [];
  } else if (removeCourse.status === 401) {
    return null;
  } else {
    throw new Error();
  }
}
}
