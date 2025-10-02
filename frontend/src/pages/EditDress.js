import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDressById, updateDress } from '../redux/slices/dressSlice';
import DressForm from '../components/DressForm';
import './Pages.css';

const EditDress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dressData, setDressData] = useState(null);
  const { items: dresses } = useSelector(state => state.dresses);

  useEffect(() => {
    const loadDress = async () => {
      try {
        // Try to find dress in Redux store first
        const existingDress = dresses.find(dress => dress._id === id);
        if (existingDress) {
          setDressData(existingDress);
        } else {
          // If not found, fetch using the mock API
          const result = await dispatch(fetchDressById(id));
          setDressData(result);
        }
      } catch (error) {
        alert('Failed to load dress: ' + error.message);
        navigate('/');
      }
    };
    loadDress();
  }, [id, dispatch, navigate, dresses]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(updateDress({ id, dressData: formData }));
      alert('Dress updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to update dress: ' + error.message);
    }
  };

  if (!dressData) {
    return <div className="loading">Loading dress details...</div>;
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