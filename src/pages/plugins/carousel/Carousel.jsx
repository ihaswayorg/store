import React, { useState, useEffect } from "react";
import "./index.css";

function Carousel({ children, css, delay }) {
 const [currentSlide, setCurrentSlide] = useState(0);

 useEffect(() => {
  let slides = document.querySelectorAll("#__slides .__slide");
  document.getElementById("__slides").style.cssText = css || "";

  let slideInterval = setInterval(function () {
   slides[currentSlide].className = "__slide";
   setCurrentSlide((prev) => (prev + 1) % slides.length);
   slides[currentSlide].className = "__slide active";
  }, delay || 5000);

  return () => {
   clearInterval(slideInterval);
  };
 }, [currentSlide]);

 const goToPrevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + children.length) % children.length);
 };

 const goToNextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % children.length);
 };

 return (
  <div id="__slides">
   <div className="__slides-controls">
    <button className="__slides-controls--prev" onClick={goToPrevSlide}>
     Prev
    </button>
    <button className="__slides-controls--next" onClick={goToNextSlide}>
     Next
    </button>
   </div>

   {children.map((child, index) => (
    <div
     key={index}
     className={`__slide ${index === currentSlide ? "active" : ""}`}
    >
     {child}
    </div>
   ))}
  </div>
 );
}

export default Carousel;
