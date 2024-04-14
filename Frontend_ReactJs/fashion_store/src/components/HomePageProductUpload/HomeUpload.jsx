// src/components/ImageUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const HomeProductsUpload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleTitleChange = (e) => { // Create a function to handle title input changes
      setTitle(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', title); // Append the title to the form data
      formData.append('description', description);
  
      try {
        await axios.post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Home Products data uploaded successfully!');
        alert("Data uploaded successfully")
        setDescription("")
        setFile(null)
        setTitle("")
      } catch (error) {
        console.error('Error uploading home products data:', error);
      }
    };
  
    return (
      <div style={{width:"40%",textAlign:"center",marginLeft:"30%"}}>
        {/* <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Image Title"
              value={title}
              onChange={handleTitleChange} // Connect the input to the handleTitleChange function
            />
          </div>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div>
            <input
              type="text"
              placeholder="Image Description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <button type="submit">Upload Image</button>
          </div>
        </form> */}
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Image Title</Form.Label>
        <Form.Control type="text" placeholder="Image Title"
              value={title}
              onChange={handleTitleChange}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Select Image</Form.Label>
        <Form.Control type="file" placeholder="Password" onChange={handleFileChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Image Description</Form.Label>
        <Form.Control type="text"  placeholder="Image Description"
              value={description}
              onChange={handleDescriptionChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
    );
};

export default HomeProductsUpload;
