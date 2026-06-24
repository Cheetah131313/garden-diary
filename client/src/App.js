import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlantCatalog from './components/PlantCatalog';
import PlantList from './components/PlantList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlantCatalog />} />
        <Route path="/plants" element={<PlantList />} />
      </Routes>
    </Router>
  );
}

export default App;
