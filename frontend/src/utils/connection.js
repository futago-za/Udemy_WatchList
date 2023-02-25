const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const fetchCourses = () => {
  return fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/course/`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to get course info');
    }
    return response.json();
  }).catch((err) => console.log(err.message));
}

const updateCourse = (item) => {
  return fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/course/${item.id}/`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to get course info');
    }
  }).catch((err) => console.log(err.message));
}

const deleteCourse = (id) => {
  return fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/course/${id}/`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {  
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to delete course info');
    }
  }).catch((err) => console.log(err.message));
}

module.exports = {
  fetchCourses,
  updateCourse,
  deleteCourse,
};