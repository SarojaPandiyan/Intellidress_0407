import React, { useState, useEffect } from 'react';
import './DressForm.css';

const DressForm = ({ initialData, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'casual',
    color: '',
    size: 'M',
    occasion: '',
    image: '',
    price: '',
    inStock: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'casual',
        color: initialData.color || '',
        size: initialData.size || 'M',
        occasion: initialData.occasion || '',
        image: initialData.image || '',
        price: initialData.price || '',
        inStock: initialData.inStock !== undefined ? initialData.inStock : true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert price to number
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0
    };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="dress-form">
      <div className="form-group">
        <label>Dress Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter dress name"
        />
      </div>

      <div className="form-group">
        <label>Type *</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="party">Party</option>
          <option value="wedding">Wedding</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="form-group">
        <label>Color *</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          placeholder="Enter color"
        />
      </div>

      <div className="form-group">
        <label>Size *</label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div className="form-group">
        <label>Occasion *</label>
        <input
          type="text"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
          placeholder="e.g., wedding, beach, office"
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        <small>Optional: Add a image URL to display</small>
      </div>

      <div className="form-group">
        <label>Price ($) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
          placeholder="0.00"
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>
      </div>

      <button type="submit" className="btn-submit">
        {buttonText}
      </button>
    </form>
  );
};

export default DressForm;