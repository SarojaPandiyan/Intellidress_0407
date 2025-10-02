import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDresses, deleteDress, clearError } from '../redux/slices/dressSlice'
import { Link } from 'react-router-dom'
import './Pages.css';

const Home = () => {
  const dispatch = useDispatch()
  const { items: dresses, loading, error } = useSelector(state => state.dresses)
  const [filters, setFilters] = useState({
    type: '',
    occasion: '',
    size: ''
  })

  useEffect(() => {
    // Load all dresses initially
    dispatch(fetchDresses());
  }, [dispatch])

  useEffect(() => {
    if (error) {
      alert('Error: ' + error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Apply filters immediately when they change
    dispatch(fetchDresses(newFilters));
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dress?')) {
      try {
        await dispatch(deleteDress(id));
        alert('Dress deleted successfully!');
        // Refresh the list after deletion with current filters
        dispatch(fetchDresses(filters));
      } catch (error) {
        alert('Error deleting dress: ' + error.message);
      }
    }
  }

  const clearFilters = () => {
    const clearedFilters = {
      type: '',
      occasion: '',
      size: ''
    };
    setFilters(clearedFilters);
    dispatch(fetchDresses(clearedFilters));
  }

  if (loading) return <div className="loading">Loading dresses...</div>

  return (
    <div className="page-container">
      {error && (
        <div className="error-message">
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
        <button onClick={clearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
        
        {/* Show active filters */}
        {(filters.type || filters.occasion || filters.size) && (
          <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e9ecef', borderRadius: '4px' }}>
            <strong>Active Filters:</strong> 
            {filters.type && ` Type: ${filters.type}`}
            {filters.occasion && ` Occasion: ${filters.occasion}`}
            {filters.size && ` Size: ${filters.size}`}
          </div>
        )}
      </div>

      <div className="dress-grid">
        {dresses.map(dress => (
          <div key={dress._id} className="dress-card">
            <div className="dress-image">
              {dress.image ? (
                <img 
                  src={dress.image} 
                  alt={dress.name} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="image-placeholder" style={{ 
                display: dress.image ? 'none' : 'flex'
              }}>
                No Image
              </div>
            </div>
            
            <h3>{dress.name || 'Unnamed Dress'}</h3>
            <p><strong>Type:</strong> {dress.type ? dress.type.charAt(0).toUpperCase() + dress.type.slice(1) : 'Not specified'}</p>
            <p><strong>Color:</strong> {dress.color || 'Not specified'}</p>
            <p><strong>Size:</strong> {dress.size || 'Not specified'}</p>
            <p><strong>Occasion:</strong> {dress.occasion || 'Not specified'}</p>
            <p><strong>Price:</strong> ${dress.price ? dress.price.toFixed(2) : '0.00'}</p>
            {dress.description && <p><strong>Description:</strong> {dress.description}</p>}
            <p style={{ 
              color: dress.inStock ? 'green' : 'red',
              fontWeight: 'bold'
            }}>
              {dress.inStock ? '✅ In Stock' : '❌ Out of Stock'}
            </p>
            
            <div className="dress-actions">
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
          <p>No dresses found matching your filters. Try adjusting your search criteria.</p>
          <button onClick={clearFilters} className="btn btn-primary">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Home