import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../HomePage/logo.png'
import "./mensFashion.css"
import { useState ,useEffect,useContext} from 'react';
import axios from 'axios';
import { cartContext } from '../CartContext/cartContext';
import { useNavigate } from 'react-router-dom';
function MensFashion() {
  const{addToCartData}=useContext(cartContext)
  const {cartData}=useContext(cartContext) 
   const[mensData,setMensData]=useState([])
  
  const navigate = useNavigate();
   useEffect(() => {
    // Fetch images from the backend
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mens-upload');
        setMensData(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);


  return (
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
    <div className='card-container'>
    {mensData.map((imageUrl,index)=>(
        <div key={index} >
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" className='card-img' src={`http://localhost:8080/${imageUrl.imagePath}`} /> 
             
      <Card.Body>
      <Card.Title>{imageUrl.title}</Card.Title>
      <Card.Text>
           <b>Price : {imageUrl.price}</b>
        </Card.Text>
        <Card.Text>
         {imageUrl.description}
        </Card.Text>
        <Card.Text>
         <b style={{color:'green'}}>Offer {imageUrl.offer}%</b> 
        </Card.Text>
        <Card.Text>
         <b>Size : {imageUrl.size}</b> 
        </Card.Text>
        <Button variant='primary' onClick={()=>{addToCartData(imageUrl)}}>Add to cart</Button>
      </Card.Body>
    </Card>
        </div>
    ))}
    </div>
    </div>
  );
}

export default MensFashion;
/*<Card.Img variant="top" className='card-img' src={`http://localhost:8080/${imageUrl.imagePath}`} /> */