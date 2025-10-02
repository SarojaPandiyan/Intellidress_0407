import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDress, updateDress } from '../redux/dressSlice';
import DressForm from '../components/DressForm';
import './Pages.css';

const EditDress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dressData, setDressData] = useState(null);

  useEffect(() => {
    const loadDress = async () => {
      try {
        const result = await dispatch(fetchDress(id)).unwrap();
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
      <DressForm 
        initialData={dressData} 
        onSubmit={handleSubmit} 
        buttonText="Update Dress" 
      />
    </div>
  );
};

export default EditDress;