import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarListingPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Fetch Car Data error:', error);
      // Handle fetch car data error, e.g., display an error message
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`/api/cars/${carId}`);
      fetchCarData();
     
    } catch (error) {
      console.error('Delete Car error:', error);
      
    }
  };

  const handleEditCar = (carId) => {

  };

  return (
    <div className='conainer2'>
      <h2>Car Listing</h2>
      {cars.map((car) => (
        <div key={car._id}>
          <img src={car.image} alt={car.title} />
          <h3>{car.title}</h3>
          <p>{car.description}</p>
          <ul>
            {car.specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <button onClick={() => handleEditCar(car._id)}>Edit</button>
          <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CarListingPage;