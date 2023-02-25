const fetchCourses = () => {
  return fetch('http://localhost:8000/api/course/', {
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
  return fetch(`http://localhost:8000/api/course/${item.id}/`, {
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
  return fetch(`http://localhost:8000/api/course/${id}/`, {
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