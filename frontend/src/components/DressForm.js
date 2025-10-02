import React, { useState, useEffect } from 'react';
import './DressForm.css';

const DressForm = ({ initialData, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    name: '',
    occasion: '',
    season: '',
    color: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="dress-form">
      <div className="form-group">
        <label>Dress Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Occasion</label>
        <select
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
        >
          <option value="">Select Occasion</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Party">Party</option>
          <option value="Wedding">Wedding</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div className="form-group">
        <label>Season</label>
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          required
        >
          <option value="">Select Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Fall">Fall</option>
          <option value="All Season">All Season</option>
        </select>
      </div>

      <div className="form-group">
        <label>Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <button type="submit" className="btn-submit">
        {buttonText}
      </button>
    </form>
  );
};

export default DressForm;