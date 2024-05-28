import { assets } from "/src/assets/assets.js";
import { useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {

  const [menu, setMenu] = useState("Home")
  return (
    <>
      <header className="navbar">
        <Link to="/"><img src={assets.logo} alt="logo" /></Link>
        <ul className="list-items">
          <a onClick={()=>setMenu("Home")} href="#home"><li className={menu==="Home"?"active":""}>Home</li></a>
          <a onClick={()=>setMenu("about")} href="#home"><li className={menu==="about"?"active":""}>About</li></a>
          <a onClick={()=>setMenu("Contact")} href="#home"><li className={menu==="Contact"?"active":""}>Contact</li></a>
          <a onClick={()=>setMenu("products")} href="#home"><li className={menu==="products"?"active":""}>Products</li></a>
        </ul> 
        <div className="icons">
          <img src={assets.search_icon} />
          <Link to="/cart"><img className="basket" src={assets.basket_icon} /></Link>
          <div className="dot"></div>
          <button>Login</button>
          {/* <img src={assets.profile_icon} /> */}
        </div>
      </header>
    </>
  );
}

export default Navbar;
