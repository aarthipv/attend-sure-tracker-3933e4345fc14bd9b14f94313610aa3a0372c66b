
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@/types/attendance";
import { calculateAttendance, formatPercentage, getAttendanceColor } from "@/utils/attendanceCalculator";
import { Pencil, Save, Trash2 } from "lucide-react";

interface CourseRowProps {
  course: Course;
  onUpdate: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState<Course>({ ...course });

  const attendanceStats = calculateAttendance(course);
  const attendanceClass = getAttendanceColor(attendanceStats.currentAttendance);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (editedCourse.classesAttended + editedCourse.classesMissed > editedCourse.totalClasses) {
      alert("Total classes should be greater than or equal to attended + missed classes");
      return;
    }
    onUpdate(editedCourse);
    setEditing(false);
  };

  const handleInputChange = (field: keyof Course, value: string) => {
    const numValue = parseInt(value) || 0;
    setEditedCourse({
      ...editedCourse,
      [field]: field === 'name' ? value : numValue
    });
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle">
        {editing ? (
          <Input
            value={editedCourse.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full"
          />
        ) : (
          course.name
        )}
      </td>
      <td className="p-4 align-middle">
        {editing ? (
          <Input
            type="number"
            min="0"
            value={editedCourse.classesAttended}
            onChange={(e) => handleInputChange('classesAttended', e.target.value)}
            className="w-full"
          />
        ) : (
          course.classesAttended
        )}
      </td>
      <td className="p-4 align-middle">
        {editing ? (
          <Input
            type="number"
            min="0"
            value={editedCourse.classesMissed}
            onChange={(e) => handleInputChange('classesMissed', e.target.value)}
            className="w-full"
          />
        ) : (
          course.classesMissed
        )}
      </td>
      <td className="p-4 align-middle">
        {editing ? (
          <Input
            type="number"
            min="0"
            value={editedCourse.totalClasses}
            onChange={(e) => handleInputChange('totalClasses', e.target.value)}
            className="w-full"
          />
        ) : (
          course.totalClasses
        )}
      </td>
      <td className={`p-4 align-middle font-medium text-${attendanceClass}`}>
        {formatPercentage(attendanceStats.currentAttendance)}
      </td>
      <td className="p-4 align-middle">{attendanceStats.classesRemaining}</td>
      <td className="p-4 align-middle">{attendanceStats.canMissFor75}</td>
      <td className="p-4 align-middle">{attendanceStats.canMissFor80}</td>
      <td className="p-4 align-middle">
        {editing ? (
          <Button size="sm" variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(course.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CourseRow;
