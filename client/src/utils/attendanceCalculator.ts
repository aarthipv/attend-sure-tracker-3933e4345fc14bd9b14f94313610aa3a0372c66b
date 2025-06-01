
import { Course, AttendanceCalculation } from "../types/attendance";

export const calculateAttendance = (course: Course): AttendanceCalculation => {
  const { classesAttended, classesMissed, totalClasses } = course;
  
  const attended = Math.max(0, classesAttended);
  const missed = Math.max(0, classesMissed);
  const total = Math.max(1, totalClasses); // Prevent division by zero
  
  // Current attendance calculation
  const currentAttendance = attended / (attended + missed) * 100 || 0;
  
  // Remaining classes
  const classesRemaining = Math.max(0, total - (attended + missed));
  
  // Calculate how many classes can be missed while maintaining 75% attendance
  let canMissFor75 = 0;
  if (classesRemaining > 0) {
    // Formula: (attended + remaining) * 0.75 = attended + (missed + X)
    // Solving for X (additional classes that can be missed)
    canMissFor75 = Math.floor((attended + classesRemaining) * 0.75 - attended - missed);
    canMissFor75 = Math.max(0, canMissFor75);
  }
  
  // Calculate how many classes can be missed while maintaining 80% attendance
  let canMissFor80 = 0;
  if (classesRemaining > 0) {
    // Similar formula but with 80%
    canMissFor80 = Math.floor((attended + classesRemaining) * 0.80 - attended - missed);
    canMissFor80 = Math.max(0, canMissFor80);
  }
  
  return {
    currentAttendance,
    classesRemaining,
    canMissFor75,
    canMissFor80
  };
};

// Get color based on attendance percentage
export const getAttendanceColor = (percentage: number): string => {
  if (percentage >= 80) return 'attendance-good';
  if (percentage >= 75) return 'attendance-warning';
  return 'attendance-danger';
};

// Format percentage with one decimal place
export const formatPercentage = (percentage: number): string => {
  return percentage.toFixed(1) + '%';
};
