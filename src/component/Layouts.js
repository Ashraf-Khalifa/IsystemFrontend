import React,{useState,useEffect} from "react";
import { Navbar, Nav, Container, Form, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logoApple from "../images/logoApple.png";
import { LinkContainer } from "react-router-bootstrap";
import "../assests/Layouts.css";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import youtube from "../images/youtube.png";
import twitter from "../images/twitter.png";
import Information from "./Information.js";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import Subscribe from "./Subscribe";
import Home from "../pages/Home";
import EnhancedModal from "./PopupLogin";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Layouts() {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const isRegistrationPage = location.pathname === "/registration";
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/getproductdetails`
        );
        setProducts(response.data);
        console.log("products", products); // Log the updated data
      } catch (error) {
        // Handle any errors that occurred during the Axios request
      }
    };
  
    fetchData();
    // if fetch not return product from db put in dependancy arr [products]
  }, []);
  
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
setIsDropdownVisible(true)
    // Filter the products based on the search query
    const filteredResults = products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
    
  };

  return (
    <>
      <header>
        <Navbar
          variant="dark"
          expand="xl"
          collapseOnSelect
          className="main_nav fixed-top"
        >
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand className="brand">
                <img src={require('../images/iSystem logo -04.png')} alt="" className="logo" height={"55px"}/>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto nav_categories">
                <LinkContainer to="/mac" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type">
                    {/* <FaShoppingCart /> */}
                    Mac
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="ipad" style={{ fontSize: "14px" }}>
                  <Nav.Link
                    href="/ipad"
                    className="catigories_type"
                    id="catigories_type"
                  >
                    {/* <FaUser /> */}
                    iPad
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="iphone" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type" id="catigories_type">
                    {/* <FaShoppingCart /> */}
                    iPhone
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="watch" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type" id="catigories_type">
                    {/* <FaShoppingCart /> */}
                    Watch
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="audio" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type" id="catigories_type">
                    {/* <FaShoppingCart /> */}
                    Audio
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="appletv" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type" id="catigories_type">
                    {/* <FaShoppingCart /> */}
                    Apple Tv
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="accessories" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type" id="catigories_type">
                    {/* <FaShoppingCart /> */}
                    Accessories
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="blog" style={{ fontSize: "14px" }}>
                  <Nav.Link className="catigories_type" id="catigories_type">
                    {/* <FaShoppingCart /> */}
                    Blog{" "}
                  </Nav.Link>
                </LinkContainer>
              </Nav>
              {/* <form class="nosubmit">
                <input class="nosubmit" type="search" onChange={handleChange}/>
              </form> */}
  <div className="navbar__search">
        <span>
          {/* <FaSistrix /> */}
        </span>
        <input
        class="nosubmit"
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <ul className= {isDropdownVisible ? "search_dropdown" :"hidedropdown"}>
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <li key={product.p_id} onClick={()=>{navigate(`/productdetails/${product.p_id}`)
                console.log(product.p_id)
                window.location.reload()
                setIsDropdownVisible(false)
                setSearchQuery(" ")
                window.scrollTo(0, 0);
                
                }}>
                  <img src={require('../images/iphonepurple.webp')} alt={product.productName} />
                  {product.product_name}
                </li>
              ))
            ) : (
              <li>No products found.</li>
            )}
          </ul>
        )}
      </div>
              <Nav className="ml-auto">
                <LinkContainer to="/cart" style={{ fontSize: "12px" }}>
                  <Nav.Link className="cart-link">
                    <FaShoppingCart />
                    <span>
                      <b>Cart</b>{" "}
                    </span>
                  </Nav.Link>
                </LinkContainer>
         

                {/* import the componnat */}
                <EnhancedModal
                  onClose={() => {
                    console.log("Modal closed");
                  }}
                  
                />
<div class="btn-group dropstart">
<img src={require('../images/caret-down.png')} alt="" height={"30%"} width={"80%"} className=" dropdown-toggle arrow_login" type="button" data-bs-toggle="dropdown" aria-expanded="false" />

  <ul class="dropdown-menu">
  <li ><Link class="dropdown-item" to={'/profile'}>Profile</Link></li>

  </ul>
</div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {isHomePage ? <Home /> : <Outlet />}

      <Information />
      <Subscribe />
      <footer>
        <MDBFooter
          bgColor="light"
          className="text-center text-lg-start text-muted"
        >
          {/* <Subscribe /> */}

          <MDBContainer className=" text-md-start footer" fluid>
            <MDBRow className="mt-3">
              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <p className="fw-bold mb-4 footer_title">Our Company</p>
                <Link to={"aboutus"} className="text-reset">
                  About Us{" "}
                </Link>
                <br></br>
                <Link to={"jointeam"} className="text-reset">
                  Join Our Team
                </Link>
                {/* <br></br>
                <a href="#!" className="text-reset">
                  Shipping & Return Policy{" "}
                </a> */}
                <br></br>
                <Link to={'contactus'} className="text-reset">
                  Contact Us
                </Link>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className=" fw-bold mb-4 footer_title">Our Services</h6>
                <Link to={"installmentplan"} className="text-reset">
                  Installment Plans{" "}
                </Link>
                <br></br>
                <Link to={"tradein"} className="text-reset">
                  Trade-In
                </Link>
                <br></br>
                {/* <a href="#!" className="text-reset">
                  iSystem Care{" "}
                </a> */}
                   <Link to={'compare'}  className="text-reset">
                  Compare{" "}
                </Link>
                <br></br>
              </MDBCol>
              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className=" fw-bold mb-4 footer_title">Our Categories</h6>
                <Link to={'ipad'} className="text-reset">
iPad                </Link>
                <br></br>
                <Link to={'mac'} className="text-reset">
                  Mac
                </Link>
                <br></br>
                <Link to={'iphone'} className="text-reset">
                  iPhone
                </Link>
              </MDBCol>

              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4 ">
                <h6 className=" fw-bold mb-4 footer_title">Follow us </h6>
                {/* <p style={{ fontSize: "12px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptatem, illum. Facilis optio iste, ducimus numquam
                  molestiae obcaecati rem quaerat deserunt.
                </p> */}
                <div className="social_media_icon">
                 <Link to={'https://www.youtube.com/channel/UCjuoIbmRGSdkk8dTcE54D8g'} style={{marginRight:"6%"}}><Image src={youtube} fluid width={"23px"} /></Link> 
                  <Link to={'https://www.facebook.com/isystemjordan'} style={{marginRight:"6%"}}><Image src={facebook} fluid width={"23px"} /></Link>
                  <Link to={'https://www.instagram.com/isystemjordan/'} style={{marginRight:"6%"}}><Image src={instagram} fluid width={"23px"} /></Link>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBFooter>
      </footer>
    </>
  );
}

export default Layouts;
