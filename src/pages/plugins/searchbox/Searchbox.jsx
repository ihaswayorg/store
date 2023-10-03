import React, { useEffect } from "react";
import "./index.css";

function Searchbox({ children, display, css }) {
 useEffect(() => {
  document.getElementById("__searchbox").style.cssText = css || "";
  document.getElementById("__searchbox").style.display =
   display != 0 ? "block" : "none";
  document.getElementById("__searchbox-inner").style.display =
   display != 0 ? "block" : "none";
 }, [display]);
 return (
  <>
   <div id="__searchbox">
    <div className="__results">{children}</div>
   </div>
   <div id="__searchbox-inner"></div>
  </>
 );
}

export default Searchbox;
