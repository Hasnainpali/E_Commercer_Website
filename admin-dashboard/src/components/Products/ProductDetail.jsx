import React, { useContext, useEffect, useRef, useState } from "react";
import Breadcrumb from "../component.common/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "react-slick";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, Rating } from "@mui/material";
import { FaReply } from "react-icons/fa";

export default function ProductDetail() {
  const ProductSliderBig = useRef();
  const ProductSliderSml = useRef();

  var ProductSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var ProductsmlSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const GoToSlider = (index)=>{
    ProductSliderBig.current.slickGoTo(index);
    ProductSliderSml.current.slickGoTo(index);
  }

  return (
    <div className="pb-5 right-content">
      <div className="breadcrumbs p-3">
        <h5 className="lh-0">Product View</h5>
        <div className="d-flex ">
          <Breadcrumb label="DashBoard" icon={<HomeIcon fontSize="small" />} />
          <span>/</span>
          <Breadcrumb label="Product" />
          <span>/</span>
          <Breadcrumb label="Product-View" />
        </div>
      </div>

      <div className="card">
        <div className="row productDetail">
          <div className="col-md-5">
            <div className="sliderWrapper p-4">
              <Slider {...ProductSlider} ref={ProductSliderBig} className="sliderBig mb-2">
                <div className="item">
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item">
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item">
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item">
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item">
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
              </Slider>
              <Slider {...ProductsmlSlider}ref={ProductSliderSml} className="sliderSml">
                <div className="item" onClick={()=>GoToSlider(0)}>
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item" onClick={()=>GoToSlider(1)}>
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item" onClick={()=>GoToSlider(2)}>
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item" onClick={()=>GoToSlider(3)}>
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
                <div className="item" onClick={()=>GoToSlider(4)}>
                  <img className="w-100" src="/google.png" alt={""} />
                </div>
              </Slider>
            </div>
          </div>
          <div className="col-md-7">
            <div className="p-4">
              <h5>Product Name Here Product Name Here Product Name Here </h5>
              <div className="productInfo mt-4">
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Brand</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Brand Name</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Category</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Category Name</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Color</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Brand Name</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Size</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Brand Name</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Price</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Brand Name</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Stock</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Brand Name</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Review</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>Brand Name</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="productDescription p-4">
          <h4 className="mb-3 mt-2"> Product Description </h4>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem cum sit iusto officiis minus voluptate accusamus
            officia, beatae distinctio placeat aliquam quam repellendus?
            Quibusdam facilis dignissimos nihil aliquam blanditiis ab sequi
            fugit recusandae voluptatem, fuga ipsam libero illo soluta
            architecto assumenda nobis corporis velit modi aliquid fugiat ut
            adipisci debitis neque? Doloremque, recusandae corporis magnam quam
            in adipisci odio voluptatum! Velit, vero expedita? Nostrum explicabo
            unde numquam, laborum quam ipsum nemo officia at suscipit doloremque
            tempore modi blanditiis veritatis sint odit minus eius, eum quas
            dolore, iure quia eveniet praesentium quisquam? Quidem culpa ipsa,
            cupiditate eligendi reprehenderit quos quam eius.{" "}
          </p>

          <br />

          <h4 className="mb-3 mt-2">Rating Analiyis</h4>
          <div className="ratingSection">
            <div className="ratingRow d-flex align-content-center p-2">
              <span className="col1"> 5 star</span>
              <div className="col2">
                <LinearProgress variant="determinate" value={80} />
              </div>
              <span className="col3">(22)</span>
            </div>
            <div className="ratingRow d-flex align-content-center p-2">
              <span className="col1"> 4 star</span>
              <div className="col2">
                <LinearProgress variant="determinate" value={60} />
              </div>
              <span className="col3">(04)</span>
            </div>
            <div className="ratingRow d-flex align-content-center p-2">
              <span className="col1"> 3 star</span>
              <div className="col2">
                <LinearProgress variant="determinate" value={40} />
              </div>
              <span className="col3">(03)</span>
            </div>
            <div className="ratingRow d-flex align-content-center p-2">
              <span className="col1"> 2 star</span>
              <div className="col2">
                <LinearProgress variant="determinate" value={30} />
              </div>
              <span className="col3">(02)</span>
            </div>
            <div className="ratingRow d-flex align-content-center p-2">
              <span className="col1"> 1 star</span>
              <div className="col2">
                <LinearProgress variant="determinate" value={10} />
              </div>
              <span className="col3">(02)</span>
            </div>
          </div>

          <br />
          <h4 className="mb-3 mt-2">Customer Reviews</h4>
          <div className="reviewSection">
            <div className="reviewRow">
              <div className="row">
                <div className="col-sm-10">
                  <div className="MyAcc d-flex align-items-center">
                    <div className="user-img">
                      <span className="rounded-circle">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNbFde_Fl2khhWUlg4iRJzXr21IS2mM8ihENYsRbTJezbWltRGEbZ80CXpobHAaqymAbg&usqp=CAU"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="user-info ">
                      <h4> Hasnain Iqbal </h4>
                      <p className="mb-0">@hasnainiqbal</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                    <Button variant="contained"  color='warning'> <FaReply/> &nbsp; Reply</Button>
                </div>
              </div>
              <div className="info">
              <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium eaque reiciendis quas earum placeat libero error consequatur, est nostrum obcaecati rerum! Sint temporibus perspiciatis debitis, voluptas laudantium ullam ipsa optio asperiores dignissimos saepe perferendis repellat. Saepe deserunt consectetur nisi laborum.</p>
              </div>
            </div>
          </div>
          <br/>
          <h4 className="mb-3 mt-2"> Reviews Form  </h4>
           <form action="" className="reviewForm">
             <textarea placeholder="write Here"></textarea>
             <div className="w-100">
             <Button variant="contained" color="warning" className="w-100">Drop Your Reply </Button>
             </div>
           </form>

        </div>
      </div>
    </div>
  );
}
