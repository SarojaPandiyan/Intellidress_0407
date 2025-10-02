import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDress } from '../redux/slices/dressSlice'; // Fixed import
import './DressList.css';

const DressList = ({ dresses }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dress?')) {
      dispatch(deleteDress(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="dress-grid">
      {dresses.map((dress) => (
        <div key={dress._id} className="dress-card">
          <h3>{dress.name}</h3>
          <div className="dress-image">
            {dress.image ? (
              <img src={dress.image} alt={dress.name} />
            ) : (
              <div className="image-placeholder">No Image</div>
            )}
          </div>
          <div className="dress-info">
            <p><strong>Type:</strong> {dress.type}</p>
            <p><strong>Color:</strong> {dress.color}</p>
            <p><strong>Size:</strong> {dress.size}</p>
            <p><strong>Occasion:</strong> {dress.occasion}</p>
            <p><strong>Price:</strong> ${dress.price}</p>
            <p style={{ color: dress.inStock ? 'green' : 'red' }}>
              {dress.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          <div className="dress-actions">
            <button onClick={() => handleEdit(dress._id)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => handleDelete(dress._id)} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DressList;