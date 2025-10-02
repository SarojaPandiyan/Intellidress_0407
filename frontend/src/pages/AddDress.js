import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createDress } from '../redux/dressSlice';
import DressForm from '../components/DressForm';
import './Pages.css';

const AddDress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      await dispatch(createDress(formData)).unwrap();
      alert('Dress added successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to add dress: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Add New Dress</h1>
      <DressForm onSubmit={handleSubmit} buttonText="Add Dress" />
    </div>
  );
};

export default AddDress;