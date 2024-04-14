// src/components/ImageUploadForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const MensUpload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [size, setSize] = useState('');
    const[data,setData]=useState([])
    const [editData, setEditedData] = useState({});
    const [error, setError] = useState(false);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleTitleChange = (e) => { // Create a function to handle title input changes
      setTitle(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
      };
    const handleOfferChange = (e) => {
        setOffer(e.target.value);
    };
    const handleSize = (e) => {
      setSize(e.target.value);
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', title); // Append the title to the form data
      formData.append('description', description);
      formData.append('price', price);
      formData.append('offer',offer)
  
      try {
        await axios.post('http://localhost:8080/mens-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Home Products data uploaded successfully!');
        alert("Data uploaded successfully")
        setDescription("")
        setFile(null)
        setTitle("")
        setOffer("")
        setPrice("")
      } catch (error) {
        console.error('Error uploading mens products data:', error);
      }
    };
    useEffect(() => {
      // Fetch images from the backend
      const fetchImages = async () => {
        try {
          const response = await axios.get('http://localhost:8080/mens-upload');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
  
      fetchImages();
    }, []);
     const handleDeletePost = (postId) => {
    // const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/mens-upload/${postId}`, {
      method: "DELETE",
      // headers: {
      //   Authorization: `${token}`,
      // },
    })
      .then((response) => response.json())

      .then((data) => {
        setData((prevData) => prevData.filter((item) => item._id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };


  function handleEditPost(PostId, e) {
    e.stopPropagation(false);
    setError(true);
  
    const postToEdit = data.find((item) => item._id === PostId);
    setEditedData({ ...editData, [PostId]: { ...postToEdit } });
  }
  
    const handleSaveEdit = async (postId) => {
      try {
        const formData = new FormData();
        formData.append('title', editData[postId].title);
        formData.append('description', editData[postId].description);
        formData.append('price', editData[postId].price);
        formData.append('offer', editData[postId].offer);
        formData.append('size', editData[postId].size);
        formData.append('image', editData[postId].Image);
    
        const response = await axios.put(
          `http://localhost:8080/mens-upload/${postId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // Add your authorization header if needed
              // Authorization: `Bearer ${token}`,
            },
          }
        );
    
        setData((prevData) =>
          prevData.map((item) => (item._id === postId ? response.data.data : item))
        );
    
        setEditedData({ ...editData, [postId]: {} });
        setError(false);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    };
    return (
      <>
      <h3 style={{textAlign:"center",marginTop:"30px",color:"green"}}>Upload Men's Data</h3>
      <div style={{width:"40%",textAlign:"center",marginLeft:"30%"}}>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Image Title</Form.Label>
        <Form.Control type="text" placeholder="Image Title"
              value={title}
              onChange={handleTitleChange}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number"  placeholder="Product Price"
              value={price}
              onChange={handlePriceChange} />
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
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Product Offer</Form.Label>
        <Form.Control type="number"  placeholder="Enter Product Offer"
              value={offer}
              onChange={handleOfferChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Product Size</Form.Label>
        <Form.Control type="number"  placeholder="Enter Product Offer"
              value={size}
              onChange={handleSize} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
      <h3 style={{textAlign:"center",marginTop:"30px",color:"red"}}>Edit and delete data</h3>
      <div>
      <Table striped="columns" style={{marginTop:"25px",textAlign:"center"}}>
      <thead>
        <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Offer</th>
            <th>Size</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
            <tr key={index}>
              <td>
       {error && editData[item._id] ? (
       <input
      type="file"
      onChange={(e) =>
        setEditedData((prevEditData) => ({
          ...prevEditData,
          [item._id]: {
            ...editData[item._id],
            Image: e.target.files[0], // Use files[0] to get the selected file
          },
        }))
      }
    />
  ) : (
    <img src={`http://localhost:8080/${item.imagePath}`} alt={item.title} 
    style={{height:"35px",width:"35px" }} />
  )}
</td>

              <td> {error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].title}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            title: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.title
                  )}</td>
              <td>{error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].description}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            description: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.description
                  )}</td>
              <td>{error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].price}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            price: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.price
                  )}</td>
              <td>{error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].offer}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            offer: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.offer
                  )}%</td>
              <td>{error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].size}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            size: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.size
                  )}</td>
                 <td>
                  {error && editData[item._id] ? (
                    <>
                      <button
                        className="signbtn"
                        onClick={() => handleSaveEdit(item._id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                     <button  onClick={(e) => handleEditPost(item._id, e)}>Edit</button>
                     <button  style={{margin:"8px"}} onClick={() => handleDeletePost(item._id)}>Delete</button>
                    </>
                  )}
                </td>
             
            </tr>
          ))}
      </tbody>
    </Table>
      </div>
      </>
    );
};

export default MensUpload;
