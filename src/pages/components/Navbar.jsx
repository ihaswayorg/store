import React from "react";
import { Link } from "react-router-dom";

/* Plugins */
import Searchbox from "../plugins/searchbox/Searchbox";

/* Assets */
import NavbarImage from "../../assets/rokomari_logo.png";

function Navbar() {
 const [displaySearchbox, setDisplaySearchbox] = React.useState(0);
 function onSearch(e) {
  if (e.target.value.length > 0) {
   setDisplaySearchbox(1);
  } else {
   setDisplaySearchbox(0);
  }
  e.target.onblur = () => {
   setDisplaySearchbox(0);
  };
 }

 return (
  <>
   {/*** NAVBAR ***/}
   <div className="__navbar-section">
    <div className="container d-flex justify-content-between">
     {/* > Logo */}
     <div className="__navbar--logo">
      <Link to="/">
       <img src={NavbarImage} alt="logo" />
      </Link>
     </div>
     {/* > Search */}
     <div className="__navbar--search">
      <form className="input-group" action="./search">
       <button
        type="button"
        className="__serach--dropdownbtn btn dropdown-toggle dropdown-toggle-split"
        data-bs-toggle="dropdown"
        aria-expanded="false"
       >
        All <span className="visually-hidden">Category</span>
       </button>
       <ul className="__search--dropdown dropdown-menu dropdown-menu-start">
        <li>
         <a className="dropdown-item active" href="#">
          All
         </a>
        </li>
        <li>
         <a className="dropdown-item" href="#">
          Best Selling
         </a>
        </li>
        <li>
         <a className="dropdown-item" href="#">
          Smaller Plugins
         </a>
        </li>
       </ul>
       <input
        type="text"
        className="form-control"
        placeholder="Search for plugins like 'Chatbot' or 'Validator'"
        name="q"
        autoComplete="off"
        autoSave="off"
        onInput={onSearch}
       />
       <Searchbox
        display={displaySearchbox}
        css={`
         width: 100%;
         max-width: 500px;
         min-height: 500px;
         margin: 0.5rem 0 0 3rem;
        `}
       ></Searchbox>
       <button type="submit" className="__btn btn btn-primary">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         x="0px"
         y="0px"
         fill="currentColor"
         width="20"
         height="20"
         viewBox="0 0 50 50"
        >
         <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
        </svg>
       </button>
      </form>
     </div>
     {/* > Menu */}
     <div className="__navbar--menu">
      <div className="d-flex">
       <div className="__item">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         fill="currentColor"
         className="bi bi-bell"
         viewBox="0 0 16 16"
        >
         <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
        </svg>
       </div>
       <div className="__item">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         fill="currentColor"
         className="bi bi-bag"
         viewBox="0 0 16 16"
        >
         <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
       </div>
       <div className="position-relative">
        <div
         className="__item-menu border rounded d-flex justify-content-center align-items-center p-1 px-2 pe-3 dropdown-toggle dropdown-toggle-split btn"
         data-bs-toggle="dropdown"
         aria-expanded="false"
        >
         <img
          className="rounded-circle"
          src="https://lh3.googleusercontent.com/a/AAcHTtfPKZ9Xu2umQyhP29l8XDjQrtvBnRf92ZIAXVEOezNK-aQ=s96-c"
          alt="Profile photo"
         />
         <p className="m-0 mx-2">Mohammad</p>
         <span className="visually-hidden d-block">Menu</span>
        </div>
        <ul className="dropdown-menu dropdown-menu-end">
         <li>
          <a className="dropdown-item" href="#">
           My Account
          </a>
         </li>
         <li>
          <a className="dropdown-item" href="#">
           My Orders
          </a>
         </li>
         <li>
          <a className="dropdown-item" href="#">
           My Wishlist
          </a>
         </li>
         <hr className="dropdown-divider" />
         <li>
          <a className="dropdown-item" href="#">
           Sign Out
          </a>
         </li>
        </ul>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Navbar;
