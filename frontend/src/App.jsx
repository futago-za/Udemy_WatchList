import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CourseCard from "./components/CourseCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { fetchCourses, updateCourse, deleteCourse } from "./utils/connection";

const reorder = (list, startIndex, endIndex) => {
  const updatedItem = list.splice(startIndex, 1)[0];
  list.splice(endIndex, 0, updatedItem);
  return {
    id: updatedItem.id,
    title: updatedItem.title,
    url: updatedItem.url,
    image_path: updatedItem.image_path,
    total_time: updatedItem.total_time,
    sort_order: endIndex,
    sections: updatedItem.sections
  };
}

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((data) => {
      setCourses(data.sort((a, b) => a.sort_order - b.sort_order));
    }).catch((err) => console.log(err.message));
  }, []);

  const onDragEnd = (result) => {
    if(!result.destination) {
      return;
    }
    const updatedItem = reorder(courses, result.source.index, result.destination.index);
    updateCourse(updatedItem).then(() => fetchCourses().then((data) => {
      setCourses(data.sort((a, b) => a.sort_order - b.sort_order));
    })).catch((err) => console.log(err.message));
  }

  const deleteItem = (id) => {
    deleteCourse(id).then(() => fetchCourses().then((data) => {
      setCourses(data.sort((a, b) => a.sort_order - b.sort_order));
    })).catch((err) => console.log(err.message));
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {courses.map((course, index) => (
                <Draggable key={course.id.toString()} draggableId={course.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ mb: 3 }}
                    >
                      <CourseCard course={course} deleteFunc={deleteItem}/>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default App;
