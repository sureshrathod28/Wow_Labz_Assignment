// AddressForm.js
import React, { useState } from 'react';
import './addressForm.css'
const AddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  }; 

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>Enter delivery address</h3>
      <label>
        Street:
        <input className='add-input' type="text" name="street" value={address.street} onChange={handleChange} />
      </label>
      <label>
        City:
        <input className='add-input' type="text" name="city" value={address.city} onChange={handleChange} />
      </label>
      <label>
        State:
        <input className='add-input' type="text" name="state" value={address.state} onChange={handleChange} />
      </label>
      <label>
        ZIP Code:
        <input className='add-input' type="text" name="zip" value={address.zip} onChange={handleChange} />
      </label>
      <button className='add-btn' type="submit">Submit</button>
    </form>
  );
};

export default AddressForm;
