import React from "react";

/* Components */
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import Hero from "./components/Home.Hero";

function Home() {
 return (
  <div>
   <Navbar />
   <Menubar />
   <Hero />
  </div>
 );
}

export default Home;
