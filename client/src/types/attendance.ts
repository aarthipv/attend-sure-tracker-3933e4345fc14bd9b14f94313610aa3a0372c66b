
export interface Course {
  id: string;
  name: string;
  classesAttended: number;
  classesMissed: number;
  totalClasses: number;
}

export interface AttendanceCalculation {
  currentAttendance: number;
  classesRemaining: number;
  canMissFor75: number;
  canMissFor80: number;
}
