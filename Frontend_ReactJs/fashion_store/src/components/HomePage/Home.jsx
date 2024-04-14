// src/CarouselComponent.js
import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo.png'
import './Home.css'
const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    // Fetch images from the backend
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/upload');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
    console.log(data)
  }, []);
  const Navigate=useNavigate();
  const handleImageClick = (index) => {
    if (index === 0||index===1) {
      Navigate('/womens')
    } else if (index === 2||index===3) {
     Navigate('/mens-fashion')
    } else {
      console.log('Clicked an image');
    }
  }
  const handleSearch = async () => {
    // Check if searchQuery is not empty before navigating
    if (searchQuery.trim() !== '') {
      console.log('Before navigating - searchQuery:', searchQuery);
      Navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
 
  const carouselImages=[
    'https://thumbs.dreamstime.com/b/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/super-sale-%7C-mens-wear-discount-design-template-ac4a6b392c932e5cad91cb7a78663e1f_screen.jpg?ts=1608365038',
    'https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man_158538-19393.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=ais',
    'https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg',
    'https://img.freepik.com/premium-psd/online-fashion-sale-instagram-social-media-posts-collection_425867-235.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696809600&semt=ais'
]
  return (
      <div className='images-container'>
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
              value={searchQuery}
          onChange={handleInputChange}
            />
            <Button className='search-btn' variant="outline-success" style={{width:"200px",height:"58px"}}  onClick={handleSearch}>Search</Button>
            <img src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" style={{height:"60px", width:"60px"}} alt="cart"
             />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className='carousel-background'>
      <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false} interval={3000}>
      {carouselImages.map((imageUrl, index) => (
        <div key={index}>
          <img style={{maxWidth:"65%",maxHeight:"65vh"}} src={imageUrl} alt={`carousel ${index}`} />
        </div>
      ))}
    </Carousel>
      </div>
    <div>
    <div className="image-list">
      {data.map((image, index) => (
        <div  key={index} className="image-item">
          <h3>{image.title}</h3>
          <img className='list-image' src={`http://localhost:8080/${image.imagePath}`} alt={`${index + 1}`} onClick={() => handleImageClick(index)} />

          <div>
          <p className="image-description">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
      </div>
  );
};

export default Home;
