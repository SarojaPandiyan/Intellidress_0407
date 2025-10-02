import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDressById, updateDress } from '../redux/slices/dressSlice'; // FIXED: fetchDressById not fetchDress
import './Pages.css';

const EditDress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dressData, setDressData] = useState(null);

  useEffect(() => {
    const loadDress = async () => {
      try {
        const result = await dispatch(fetchDressById(id)).unwrap(); // FIXED: fetchDressById
        setDressData(result);
      } catch (error) {
        alert('Failed to load dress');
        navigate('/');
      }
    };
    loadDress();
  }, [id, dispatch, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(updateDress({ id, dressData: formData })).unwrap();
      alert('Dress updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to update dress: ' + error.message);
    }
  };

  if (!dressData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Dress</h1>
      {/* You'll need to create a proper form or use DressForm with correct fields */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        handleSubmit(data);
      }}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" defaultValue={dressData.name} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" defaultValue={dressData.type} required>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
            <option value="wedding">Wedding</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div className="form-group">
          <label>Color</label>
          <input type="text" name="color" defaultValue={dressData.color} required />
        </div>
        <div className="form-group">
          <label>Size</label>
          <select name="size" defaultValue={dressData.size} required>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div className="form-group">
          <label>Occasion</label>
          <input type="text" name="occasion" defaultValue={dressData.occasion} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" defaultValue={dressData.price} step="0.01" required />
        </div>
        <button type="submit" className="btn-submit">Update Dress</button>
      </form>
    </div>
  );
};

export default EditDress;