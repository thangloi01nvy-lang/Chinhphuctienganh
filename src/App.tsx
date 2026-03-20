import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import StudentHub from './pages/StudentHub';
import Admin from './pages/Admin';

import LessonPlan from './pages/LessonPlan';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="student-hub" element={<StudentHub />} />
          <Route path="lesson-plan" element={<LessonPlan />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
