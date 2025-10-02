import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Pages.css'; 
import { fetchDresses } from '../redux/slices/dressSlice' // FIXED: fetchDresses not fetchDress

const DressSuggestions = () => {
  const dispatch = useDispatch()
  const { items: dresses, loading } = useSelector(state => state.dresses)
  
  const [preferences, setPreferences] = useState({
    type: '',
    occasion: '',
    maxPrice: ''
  })

  const handleChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleGetSuggestions = (e) => {
    e.preventDefault()
    const filters = { ...preferences }
    dispatch(fetchDresses(filters)) // FIXED: fetchDresses not fetchDress
  }

  return (
    <div>
      <h2>Get Dress Suggestions</h2>
      
      <form onSubmit={handleGetSuggestions} className="filters">
        <h3>Tell us your preferences</h3>
        <div className="filter-row">
          <div className="form-group">
            <label>Dress Type</label>
            <select 
              name="type" 
              value={preferences.type} 
              onChange={handleChange}
            >
              <option value="">Any Type</option>
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
              name="occasion"
              value={preferences.occasion}
              onChange={handleChange}
              placeholder="e.g., beach, office, dinner"
            />
          </div>

          <div className="form-group">
            <label>Max Price</label>
            <input 
              type="number" 
              name="maxPrice"
              value={preferences.maxPrice}
              onChange={handleChange}
              placeholder="Maximum budget"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Get Suggestions
        </button>
      </form>

      {loading && <div>Loading suggestions...</div>}

      {dresses.length > 0 && (
        <div>
          <h3>Suggested Dresses ({dresses.length} found)</h3>
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
                <p style={{ color: dress.inStock ? 'green' : 'red' }}>
                  {dress.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && dresses.length === 0 && preferences.type && (
        <p>No dresses found matching your criteria. Try adjusting your filters.</p>
      )}
    </div>
  )
}

export default DressSuggestions