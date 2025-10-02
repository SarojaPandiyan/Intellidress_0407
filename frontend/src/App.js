import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddDress from './pages/AddDress';
import EditDress from './pages/EditDress';
import DressSuggestions from './pages/DressSuggestions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddDress />} />
            <Route path="/edit/:id" element={<EditDress />} />
            <Route path="/suggestions" element={<DressSuggestions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;