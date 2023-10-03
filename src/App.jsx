import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Error from "./pages/Error";

function App() {
 return (
  <Router basename="/store/">
   <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/about" element={<About />}></Route>
    <Route path="/search" element={<Search />}></Route>
    <Route path="*" element={<Error />}></Route>
   </Routes>
  </Router>
 );
}

export default App;
