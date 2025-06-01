
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Course } from "@/types/attendance";

interface AddCourseFormProps {
  onAddCourse: (course: Course) => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onAddCourse }) => {
  const [name, setName] = useState("");
  const [classesAttended, setClassesAttended] = useState("");
  const [classesMissed, setClassesMissed] = useState("");
  const [totalClasses, setTotalClasses] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      toast.error("Please enter a course name");
      return;
    }

    const attended = parseInt(classesAttended) || 0;
    const missed = parseInt(classesMissed) || 0;
    const total = parseInt(totalClasses) || 0;

    if (attended < 0 || missed < 0 || total < 0) {
      toast.error("Values cannot be negative");
      return;
    }

    if (attended + missed > total) {
      toast.error("Total classes should be greater than or equal to attended + missed classes");
      return;
    }

    // Create new course object
    const newCourse: Course = {
      id: Date.now().toString(),
      name: name.trim(),
      classesAttended: attended,
      classesMissed: missed,
      totalClasses: total
    };

    // Add course and reset form
    onAddCourse(newCourse);
    toast.success("Course added successfully");
    
    // Reset form
    setName("");
    setClassesAttended("");
    setClassesMissed("");
    setTotalClasses("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Add New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mathematics"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="attended">Classes Attended</Label>
              <Input
                id="attended"
                type="number"
                min="0"
                value={classesAttended}
                onChange={(e) => setClassesAttended(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="missed">Classes Missed</Label>
              <Input
                id="missed"
                type="number"
                min="0"
                value={classesMissed}
                onChange={(e) => setClassesMissed(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="total">Total Classes</Label>
              <Input
                id="total"
                type="number"
                min="0"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-attendance-blue hover:bg-blue-600"
          >
            Add Course
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCourseForm;
