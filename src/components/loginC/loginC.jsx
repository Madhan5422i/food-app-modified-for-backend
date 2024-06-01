/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./loginC.css";
// import { assets } from "/src/assets/assets.js";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import CircularProgress from "@mui/material/CircularProgress";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const { auth, setAuth, checkAuth } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleB() {
    setShowPassword(!showPassword);
  }

  function submitData(event) {
    setLoading(true);
    event.preventDefault();
    function getCsrfToken() {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        let [name, value] = cookie.split("=");
        if (name === "csrftoken") {
          return value;
        }
      }
      return null;
    }
    let csrftoken = getCsrfToken();

    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setResult(data);
      setLoading(false);
    };

    fetchData();
  }

  const base_name = "/food-app-modified-for-backend/";
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth(result);
    if (auth) {
      navigate(base_name); // Redirect to homepage
    }
  }, [result, checkAuth, auth, navigate,base_name]);

  console.log(result);
  console.log(auth);
  console.log(base_name)
  return (
    <div className="bodyl">
      <div className="parent">
        <div className="main">
          <div className="one">
            <div className="login-txt">
              <h1>Login</h1>
              <p>
                Don&apos;t have an account?<a href="#">Sign up</a>
              </p>
            </div>
            <form method="post" onSubmit={(e) => submitData(e)}>
              <div className="email-cont">
                <MdEmail className="email" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pass-cont">
                <MdLock className="pass" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <MdVisibilityOff onClick={toggleB} className="eye" />
                ) : (
                  <MdVisibility onClick={toggleB} className="eye" />
                )}
              </div>

              <div className="remember-txt">
                <div className="check">
                  <input type="checkbox" name="Remember me" />
                  <label htmlFor="Remember me">Remember me</label>
                </div>
                <a href="#">Forgot Password ?</a>
              </div>
              {loading ? (
                <div className="loading-c">
                  <CircularProgress
                    style={{ color: "tomato", animationDuration: "10s" }}
                    size={30}
                  />
                </div>
              ) : (
                <button type="submit">Login</button>
              )}
            </form>
          </div>
          <div>
            <img className="image" src={assets.loginphoto} alt="google" />
          </div>
          {auth ? <p>logged</p> : <p>not logged</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
