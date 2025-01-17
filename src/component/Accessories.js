import React, { useEffect,useState } from "react";
import "../assests/Iphone.css";
import { Component } from "react";
import ReactDOM from "react-dom";
// import ReactCardCarousel from "react-card-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import AllProduct from "./AllProduct";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DataCategory from "../Data/DataCategory";
export default function Accessories() {
  const slider = React.useRef(null);
  
  const [data, setData] = useState([]);
let [filteredProducts,setFilteredProducts]=useState([])


useEffect(() => {
  window.scrollTo(0, 0);
  axios.get('https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/getproductdetailsaccessories')
    .then((res) => {
  const dataWithImages = res.data.map(data => ({
          ...data,
          image_main: `data:image/jpeg;base64,${data.image_base64}`
        }));
        console.log("Data with images:", dataWithImages);
              setData(dataWithImages);
              setFilteredProducts(dataWithImages); // Initialize filteredProducts with all products

    })
    .catch((err) => {
      console.log(`err${err}`);
    });
}, []);

console.log(data);



  useEffect(()=>{
    window.scrollTo(0,0)
  })
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const handleClick = (productName) => {
    // Find products with titles containing the productName
    const filtered = data.filter((product) =>
      product.product_name.includes(productName)
    );
    setFilteredProducts(filtered);
  };
  return (
    <>
    <div className="w-100 overflow-x-hidden overflow-y-hidden">
            <div>
              
              <img
                src={require("../images/Accessories Section.jpg")}
                alt=""
                width={"100%"}
              />
            </div>{" "}
            <div >
    
    <div className="row slider_box" >
      <div className="col-lg-1 ">
        {" "}
        <a
          className="btn btn-primary mb-3 arrow_slider hide_btn"
          role="button"
          data-slide="prev"
          onClick={() => slider.current.slickPrev()}
        >
          <i className="fa fa-arrow-left "></i>
        </a>
      </div>
      <div className="col-lg-9">
        <div className="slider-container">
          <Slider {...settings} ref={slider}>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1"  onClick={(e) => handleClick(e.target.textContent)}>
              Accessories 54
              </button>
            </div>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1"  onClick={(e) => handleClick(e.target.textContent)} >
              Accessories 63
              </button>
            </div>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1"  onClick={(e) => handleClick(e.target.textContent)}>
              Accessories 43
              </button>
            </div>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1"  onClick={(e) => handleClick(e.target.textContent)}>
              Accessories 52
              </button>
            </div>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1" onClick={(e) => handleClick(e.target.textContent)}>
              Accessories 4
              </button>
            </div>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1" onClick={(e) => handleClick(e.target.textContent)}>
              Accessories 79
              </button>
            </div>
            <div>
              {" "}
              <button class="CARD_STYLE" tabIndex="-1" onClick={(e) => handleClick(e.target.textContent)}>
              Accessories 5{" "}
              </button>
            </div>
          </Slider>
        </div>
        </div>

        <div className="col-lg-1 ">
          {" "}
          <a
            className="btn btn-primary mb-3 arrow_slider hide_btn"
            role="button"
            data-slide="next"
            onClick={() => slider.current.slickNext()}
          >
            <i className="fa fa-arrow-right"></i>
          </a>
        </div>
    </div>
  </div>
        {/* <AllProduct   filteredProducts={filteredProducts}/> */}
   
         {/* start */}

      
         <div class="container text-center">
        <div class="row">
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <div class="col-md-6 col-lg-4 mb-4 mb-lg-4 " key={product.p_id}>
                                    <Link to={`productdetails/${product.p_id}`}style={{textDecoration:"none"}}>

                  <div class="card">
                    <img
                      src={`data:image/jpeg;base64,${product.image_base64}`} // Assuming it's base64 encoded
                      alt={product.product_name}
                      class="card-img-top"
                    />
                    <div class="d-flex justify-content-between ps-3 pt-3">
                      <p
                        class="lead mb-0 card_title category_title"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {product.product_name}{" "}
                      </p>
                    </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <p
                          className="small price"
                          style={{ color: "#C6C6C6", fontSize: "14px " }}
                        >
                          Starting at{" "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "17px",
                            }}
                          >
                            {product.price} JD
                          </span>
                        </p>
                        <div class="d-flex justify-content-between mb-2">
                          <p className={`mb-0 ${product.stock === 1 ? 'inStock' : 'outOfStock'}`}>
                            {product.stock === 1 ? "In stock" : "Out of stock"  }{" "}
                          </p>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))
            :  (
              <p>Product not valid</p>
            )}
        </div>
      </div>
      </div>
    </>
  );
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Accessories />, rootElement);
