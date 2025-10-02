import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDresses, deleteDress, clearError } from '../redux/slices/dressSlice'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const { items: dresses, loading, error } = useSelector(state => state.dresses)
  const [filters, setFilters] = useState({
    type: '',
    occasion: '',
    size: ''
  })

  useEffect(() => {
    dispatch(fetchDresses(filters)) // FIXED: fetchDresses not fetchDress
  }, [dispatch, filters])

  useEffect(() => {
    if (error) {
      alert('Error: ' + error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dress?')) {
      try {
        await dispatch(deleteDress(id)).unwrap()
      } catch (error) {
        alert('Error deleting dress: ' + error)
      }
    }
  }

  return (
    <div>
      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c33', 
          padding: '1rem', 
          marginBottom: '1rem',
          borderRadius: '4px'
        }}>
          Error: {error}
        </div>
      )}
      
      <div className="filters">
        <h3>Filter Dresses</h3>
        <div className="filter-row">
          <div className="form-group">
            <label>Type</label>
            <select 
              value={filters.type} 
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="party">Party</option>
              <option value="wedding">Wedding</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="form-group">
            <label>Occasion</label>
            <input 
              type="text" 
              value={filters.occasion}
              onChange={(e) => handleFilterChange('occasion', e.target.value)}
              placeholder="e.g., beach, office, dinner"
            />
          </div>
          <div className="form-group">
            <label>Size</label>
            <select 
              value={filters.size} 
              onChange={(e) => handleFilterChange('size', e.target.value)}
            >
              <option value="">All Sizes</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <div>Loading dresses...</div>}

      <div className="dress-grid">
        {dresses.map(dress => (
          <div key={dress._id} className="dress-card">
            <div className="dress-image">
              {dress.image ? (
                <img src={dress.image} alt={dress.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                'No Image'
              )}
            </div>
            <h3>{dress.name}</h3>
            <p>Type: {dress.type}</p>
            <p>Color: {dress.color}</p>
            <p>Size: {dress.size}</p>
            <p>Occasion: {dress.occasion}</p>
            <p>Price: ${dress.price}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <Link to={`/edit/${dress._id}`} className="btn btn-primary">
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(dress._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && dresses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No dresses found. Add some dresses to get started!</p>
          <Link to="/add" className="btn btn-primary">
            Add Your First Dress
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home