import React, { useState } from 'react';
import axios from 'axios';

const CarDetailsPage = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState(Array(5).fill(''));

  const handleAddCarDetails = async () => {
    try {
      const carData = {
        image,
        title,
        description,
        specifications,
      };

      const response = await axios.post('/api/cars', carData);
      console.log('Add Car Details response:', response.data);
      // Handle successful car details addition, e.g., display a success message
    } catch (error) {
      console.error('Add Car Details error:', error);
      // Handle car details addition error, e.g., display an error message
    }
  };

  const handleSpecificationChange = (index, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index] = value;
    setSpecifications(updatedSpecifications);
  };

  return (
    <div>
      <h2>Add Car Details</h2>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h4>Specifications:</h4>
      {specifications.map((spec, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Specification ${index + 1}`}
          value={spec}
          onChange={(e) => handleSpecificationChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleAddCarDetails}>Add Car Details</button>
    </div>
  );
};

export default CarDetailsPage;