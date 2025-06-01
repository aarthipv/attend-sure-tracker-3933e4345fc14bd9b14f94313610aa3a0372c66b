
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Course } from "@/types/attendance";
import { getCourses, addCourse, updateCourse, deleteCourse } from "@/services/courseService";
import Header from "@/components/Header";
import AddCourseForm from "@/components/AddCourseForm";
import CoursesTable from "@/components/CoursesTable";
import AttendanceSummary from "@/components/AttendanceSummary";

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  // Load courses from local storage on initial render
  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const handleAddCourse = (course: Course) => {
    const updatedCourses = addCourse(course);
    setCourses(updatedCourses);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    const updatedCourses = updateCourse(updatedCourse);
    setCourses(updatedCourses);
    toast.success("Course updated successfully");
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updatedCourses = deleteCourse(courseId);
      setCourses(updatedCourses);
      toast.success("Course deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-5xl mx-auto">
          <AddCourseForm onAddCourse={handleAddCourse} />
          
          <AttendanceSummary courses={courses} />
          
          <CoursesTable 
            courses={courses}
            onUpdateCourse={handleUpdateCourse}
            onDeleteCourse={handleDeleteCourse}
          />

          {courses.length > 0 && (
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-medium">Guidance:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Current %: Your current attendance percentage</li>
                <li>Remaining: Number of classes yet to be conducted</li>
                <li>Can Miss (75%): Additional classes you can miss while maintaining 75% attendance</li>
                <li>Can Miss (80%): Additional classes you can miss while maintaining 80% attendance</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
