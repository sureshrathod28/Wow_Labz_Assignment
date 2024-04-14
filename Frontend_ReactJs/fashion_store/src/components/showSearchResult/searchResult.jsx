// src/SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './searchResult.css'; // Import the CSS file
import { cartContext } from '../CartContext/cartContext';
import logo from "../HomePage/logo.png"
const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();
  const{addToCartData}=useContext(cartContext)
  const {cartData}=useContext(cartContext)
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch search results based on the query
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/search?query=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <div>
      <Navbar expand="lg"  className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img style={{width:"60px",height:"60px"}} src={logo} alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Account</Nav.Link>
            <NavDropdown title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
               My Orders
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className='search-btn' variant="outline-success" style={{width:"200px",height:"58px"}}>Search</Button>
            <img onClick={() => navigate('/cart')} src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" style={{height:"60px", width:"60px"}} alt="cart" />
            <span className="cart-length" style={{fontSize:"2.5rem",color:"green"}}>{cartData.length}</span>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
      <div className="show-container">
        {/* Display search results as cards */}
        {searchResults.map((result,index) => (
          <div key={index} className="show-card">
            <p><b>{result.title}</b></p>
            <img src={`http://localhost:8080/${result.imagePath}`} alt={result.title} />
            
            <p>{result.description}</p>
            <p style={{color:'green'}}><b> Offer:{result.offer}% off</b></p>
            <p style={{marginBottom:"10px"}}><b>{result.price}/-</b></p>
            <div>
            <Button variant='primary' onClick={()=>{addToCartData(result)}}>Add to cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
