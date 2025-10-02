import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDress, deleteDress, clearError } from '../redux/slices/dressSlice'
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
    dispatch(fetchDresses(filters))
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
          {/* ... rest of your filter code ... */}
        </div>
      </div>

      {loading && <div>Loading dresses...</div>}

      <div className="dress-grid">
        {dresses.map(dress => (
          <div key={dress._id} className="dress-card">
            {/* ... rest of your dress card code ... */}
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