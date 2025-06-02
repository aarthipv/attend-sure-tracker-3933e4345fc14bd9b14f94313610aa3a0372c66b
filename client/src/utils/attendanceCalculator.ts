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
  
  // Helper to calculate how many more classes can be missed
  function calculateCanMiss(attended: number, missed: number, remaining: number, threshold: number) {
    let canMiss = 0;
    for (let x = 0; x <= remaining; x++) {
      const percent = attended / (attended + missed + x) * 100;
      if (percent >= threshold * 100) {
        canMiss = x;
      } else {
        break;
      }
    }
    return canMiss;
  }
  
  const canMissFor75 = calculateCanMiss(attended, missed, classesRemaining, 0.75);
  const canMissFor80 = calculateCanMiss(attended, missed, classesRemaining, 0.80);
  
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
