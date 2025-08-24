import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShowCreators, ViewCreator, EditCreator, AddCreator } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/creator/add" element={<AddCreator />} />
          <Route path="/creator/:name/edit" element={<EditCreator />} />
          <Route path="/creator/:name" element={<ViewCreator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
