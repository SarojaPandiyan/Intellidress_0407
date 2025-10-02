import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <h1>Intellidress</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Dress</Link></li>
            <li><Link to="/suggestions">Get Suggestions</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header