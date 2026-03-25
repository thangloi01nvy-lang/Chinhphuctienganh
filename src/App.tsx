import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import StudentHub from './pages/StudentHub';
import Documents from './pages/Documents';
import Admin from './pages/Admin';

import LessonPlan from './pages/LessonPlan';
import Quiz from './pages/Quiz';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="student-hub" element={<StudentHub />} />
          <Route path="documents" element={<Documents />} />
          <Route path="lesson-plan" element={<LessonPlan />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
