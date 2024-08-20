/* eslint-disable no-unused-vars */
import { assets } from "/src/assets/assets.js";
import { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Cookies from "js-cookie";

function Navbar() {
  const { auth, detail, checkAuth } = useContext(StoreContext);
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  const base_name = "/food-app-modified-for-backend/";
  const [result, setResult] = useState();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const csrftoken = Cookies.get("csrftoken");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include", // Include credentials in request
    };
    const submitData = async () => {
      console.log(auth);
      if (auth) {
        const response = await fetch(
          "http://localhost:8000/api/logout/",
          options
        );
        const data = await response.json();
        if (response.ok) {
          setResult(data);
          navigate(base_name);
          window.location.reload();
        } else {
          console.log("not ok");
        }
      } else {
        console.log("not auth");
      }
    };
    submitData();
  };

  return (
    <header className="navbar">
      <Link to={`${base_name}`}>
        <img src={assets.logo} alt="logo" />
      </Link>
      <ul className="list-items">
        <a onClick={() => setMenu("Home")} href="#home">
          <li className={menu === "Home" ? "active" : ""}>Home</li>
        </a>
        <a onClick={() => setMenu("about")} href="#home">
          <li className={menu === "about" ? "active" : ""}>About</li>
        </a>
        <a onClick={() => setMenu("Contact")} href="#home">
          <li className={menu === "Contact" ? "active" : ""}>Contact</li>
        </a>
        <a onClick={() => setMenu("products")} href="#home">
          <li className={menu === "products" ? "active" : ""}>Products</li>
        </a>
      </ul>
      <div className="icons">
        <img src={assets.search_icon} />
        <Link to={`${base_name}cart`}>
          <img className="basket" src={assets.basket_icon} />
        </Link>
        <div className="dot"></div>
        {auth ? (
          <>
            <div className="det-con">
              <Link to={`${base_name}profile`}>
                <img src={`http://localhost:8000${detail.profile_image}`} />
              </Link>

              {/* {detail && <p className="name">{detail.email}</p>} */}
            </div>
            <form onSubmit={(e) => logout(e)}>
              <button type="submit">Logout</button>
            </form>
          </>
        ) : (
          <div>
            <Link to={`${base_name}login`}>
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
