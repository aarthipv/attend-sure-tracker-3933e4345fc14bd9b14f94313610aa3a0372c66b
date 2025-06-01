
import { Course } from "../types/attendance";

const STORAGE_KEY = "attendance-tracker-courses";

export const getCourses = (): Course[] => {
  try {
    const coursesJSON = localStorage.getItem(STORAGE_KEY);
    return coursesJSON ? JSON.parse(coursesJSON) : [];
  } catch (error) {
    console.error("Failed to get courses from storage:", error);
    return [];
  }
};

export const saveCourses = (courses: Course[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error("Failed to save courses to storage:", error);
  }
};

export const addCourse = (course: Course): Course[] => {
  const courses = getCourses();
  const updatedCourses = [...courses, course];
  saveCourses(updatedCourses);
  return updatedCourses;
};

export const updateCourse = (updatedCourse: Course): Course[] => {
  const courses = getCourses();
  const updatedCourses = courses.map(course => 
    course.id === updatedCourse.id ? updatedCourse : course
  );
  saveCourses(updatedCourses);
  return updatedCourses;
};

export const deleteCourse = (courseId: string): Course[] => {
  const courses = getCourses();
  const updatedCourses = courses.filter(course => course.id !== courseId);
  saveCourses(updatedCourses);
  return updatedCourses;
};
