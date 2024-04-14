// Cart.js
import React,{useContext,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom"
import { cartContext } from '../CartContext/cartContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../HomePage/logo.png'
import "./Checkout.css"
import AddressForm from '../AddressForm/addressForm';
import axios from 'axios';
const Cart = () => {
  const {cartData,removeCartData}=useContext(cartContext)
  const calculateTotalPrice = () => {
    let total = 0;
    const billItems = [];

    cartData.forEach((cartItem) => {
      const price = parseFloat(cartItem.item.price);
      const offer = parseFloat(cartItem.item.offer) / 100; // Convert offer to a decimal
      const discountedPrice = price - price * offer;

      // Add the product description to the bill
      billItems.push(
        `${cartItem.item.title} - Price: Rs.${price.toFixed(2)}, Offer: ${cartItem.item.offer}%, Discounted Price: Rs.${discountedPrice.toFixed(2)}`
      );

      total += discountedPrice;
    });

    return { total, billItems };
  };
   
  const navigateToPayment = () => {
    navigate('/payment', { state: { totalAmount: total } });
  };
  const handleAddressSubmit = (address) => {
    // You can handle the address data here (e.g., send it to the server)
    console.log('Address submitted:', address);

    // Make an HTTP POST request to the server to submit the address
    axios.post('http://localhost:8080/submit-address', address)
      .then(response => {
       alert("Address submitted successfully")
      })
      .catch(error => {
        // Handle errors from the server
        console.error('Error submitting address:', error);
      });
  };

  const { total, billItems } = calculateTotalPrice();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate=useNavigate()
  const handleRemoveFromCart = (product) => {
    removeCartData(product);
  }
  useEffect(() => {
    // Calculate the total price when the cartData changes
    setTotalPrice(calculateTotalPrice());
  }, [cartData]);
  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary">
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
          <Form className="none d-flex">
            <img src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" style={{height:"60px", width:"60px"}} alt="cart" />
            <span className="cart-length" style={{fontSize:"2.5rem",color:"green"}}>{cartData.length}</span>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <h2 style={{textAlign:"center"}}>Cart</h2>
    <div className='cart-container' style={{ display: 'flex', justifyContent: 'center' }} >
      
      <ul>
        {cartData.map((product,index) => (
          <Card  style={{ width: '18rem',margin:"15px",textAlign:"center" }}>
          <Card.Img variant="top" style={{height:"300px"}} className='card-img' src={`http://localhost:8080/${product.item.imagePath}`} /> 
                   
            <Card.Body>
            <Card.Title>{product.item.title}</Card.Title>
            <Card.Text>
                 <b>Price : {product.item.price}</b>
              </Card.Text>
              <Card.Text>
               {product.item.description}
              </Card.Text>
              <Card.Text>
               <b style={{color:'green'}}>Offer {product.item.offer}%</b> 
              </Card.Text>
           
              <Button variant='primary' onClick={()=>navigate('/home')} style={{backgroundColor:"orange",color:"white"}}>Continue shopping</Button> <br />
              <Button variant='primary' style={{backgroundColor:"red",color:"white",margin:"5px"}}  key={index} onClick={() => handleRemoveFromCart(product.item)}>Remove</Button>
            </Card.Body>
          </Card>
        ))}
      </ul>
      
      <div className="bill-card">
      <div>
        <AddressForm onSubmit={handleAddressSubmit}/>
      </div>
    <h3 className="bill">Bill:</h3>
    <ul className="bill">
     {billItems.map((item, index) => (
    <li key={index}>
      {item} <span className="offer">[Offer Applied]</span>
    </li>
     ))}
    </ul>
    <p className="total">Total: Rs.{total.toFixed(2)}</p>
    <button onClick={navigateToPayment}>Proceed to payment</button>
    
    </div>
      
    </div>
   
  </>
  );
};

export default Cart;
