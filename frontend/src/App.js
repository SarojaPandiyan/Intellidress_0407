import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddDress from './pages/AddDress';
import EditDress from './pages/EditDress';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddDress />} />
            <Route path="/edit/:id" element={<EditDress />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;