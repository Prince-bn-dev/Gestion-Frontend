import React, { Component } from "react";
import Slider from "react-slick";

function CustomPaging() {
    const tab = [
        {title: "Peugeot 308", description: "Description du véhicule 1" , image: "/images/p1.png"},
        {title: "Peuget208", description: "Description du véhicule 2" , image: "/images/p2.png"},
        {title: "Audi A3", description: "Description du véhicule 3" , image: "/images/p3.png"},
        {title: "Mercedes ClasseA", description: "Description du véhicule 4" , image: "/images/p4.png"},
        {title: "Audi A1", description: "Description du véhicule 5" , image: "/images/p5.png"},
    ]
  const settings = {
    customPaging: function(i) {
      return (
        <a className="b-item">
          <img src={`/images/b${i + 1}.svg`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
     responsive: [
      {
        breakpoint: 758,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
            tab.map((item, index) => (
          <div key={index} className="slider-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
         ))
        }
      </Slider>
    </div>
  );
}

export default CustomPaging;
