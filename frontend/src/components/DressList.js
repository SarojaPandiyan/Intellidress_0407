import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDress } from '../redux/dressSlice';
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
          <div className="dress-info">
            <p><strong>Occasion:</strong> {dress.occasion}</p>
            <p><strong>Season:</strong> {dress.season}</p>
            <p><strong>Color:</strong> {dress.color}</p>
            <p><strong>Description:</strong> {dress.description}</p>
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