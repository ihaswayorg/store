import React from "react";

function Menubar() {
 return (
  <>
   {/*** MENU ***/}
   <div className="__menu-section">
    <div className="container-fluid">
     {/* > Top Bar */}
     <div className="__menu-top d-flex justify-content-center">
      <div className="active">Web Plugins</div>
      <div>Popular Plugins</div>
      <div>New Plugins</div>
      <div>Free Plugins</div>
      <div>Today's Offers</div>
      <div>Friday Deals</div>
      <div>Blog</div>
     </div>
     {/* > Bottom Bar */}
     <div className="__menu-bottom"></div>
    </div>
   </div>
  </>
 );
}

export default Menubar;
