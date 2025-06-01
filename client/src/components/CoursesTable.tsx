
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types/attendance";
import CourseRow from "./CourseRow";

interface CoursesTableProps {
  courses: Course[];
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({
  courses,
  onUpdateCourse,
  onDeleteCourse,
}) => {
  if (courses.length === 0) {
    return (
      <Card className="w-full mt-8">
        <CardContent className="pt-6 text-center text-muted-foreground">
          No courses added yet. Add your first course above.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-center">Your Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium">Course</th>
                <th className="p-4 text-left font-medium">Classes Attended</th>
                <th className="p-4 text-left font-medium">Classes Missed</th>
                <th className="p-4 text-left font-medium">Total Classes</th>
                <th className="p-4 text-left font-medium">Current %</th>
                <th className="p-4 text-left font-medium">Remaining</th>
                <th className="p-4 text-left font-medium">Can Miss (75%)</th>
                <th className="p-4 text-left font-medium">Can Miss (80%)</th>
                <th className="p-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  onUpdate={onUpdateCourse}
                  onDelete={onDeleteCourse}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesTable;
