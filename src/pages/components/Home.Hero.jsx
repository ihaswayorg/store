import React from "react";

/* Plugins */
import Carousel from "./../plugins/carousel/Carousel";

/* Assets */
import HeroBanner1 from "./../../assets/7c990a6a-5044-4f2e-a021-1669e7b17092.png";
import HeroBanner2 from "./../../assets/80f4a159-85a8-44d1-832b-3567d00e2162.webp";
import HeroBanner3 from "./../../assets/430ea00d-0d8a-4681-89b0-7b326599d67d.webp";

function Hero() {
 return (
  <>
   {/*** HERO ***/}
   <div className="__hero-section mt-3">
    <div className="container">
     {/* > Carousel */}
     <Carousel
      css={`
       width: 100%;
       height: 260px;
       background-color: #fff;
      `}
     >
      <div>
       <img src={HeroBanner1} alt="hero banner" />
      </div>
      <div>
       <img src={HeroBanner2} alt="hero banner" />
      </div>
      <div>
       <img src={HeroBanner3} alt="hero banner" />
      </div>
     </Carousel>
    </div>
   </div>
  </>
 );
}

export default Hero;
