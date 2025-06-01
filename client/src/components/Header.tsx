
import React from 'react';

const Header = () => {
  return (
    <header className="bg-attendance-blue text-white py-6 mb-8 rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Student Attendance Tracker</h1>
        <p className="text-center mt-2 opacity-90">Track your attendance and stay above required thresholds</p>
      </div>
    </header>
  );
};

export default Header;
