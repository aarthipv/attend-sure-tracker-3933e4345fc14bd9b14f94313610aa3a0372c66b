
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types/attendance";
import { calculateAttendance } from "@/utils/attendanceCalculator";

interface AttendanceSummaryProps {
  courses: Course[];
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ courses }) => {
  // Calculate overall stats
  const totalCoursesCount = courses.length;
  let coursesBelow75 = 0;
  let coursesBetween75And80 = 0;
  let coursesAbove80 = 0;

  courses.forEach(course => {
    const stats = calculateAttendance(course);
    const attendance = stats.currentAttendance;
    
    if (attendance < 75) {
      coursesBelow75++;
    } else if (attendance >= 75 && attendance < 80) {
      coursesBetween75And80++;
    } else {
      coursesAbove80++;
    }
  });

  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalCoursesCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-attendance-good">Good Standing (≥80%)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{coursesAbove80}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-attendance-warning">Warning Zone (75-79%)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{coursesBetween75And80}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-attendance-danger">Danger Zone (&lt;75%)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{coursesBelow75}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSummary;
