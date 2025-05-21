import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from 'pages/EventsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>
    </Router>
  );
}
export default App;

