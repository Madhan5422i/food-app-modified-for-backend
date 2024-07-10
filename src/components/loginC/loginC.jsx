/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, createContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./loginC.css";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LoginComponent() {
  const { auth, setAuth } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const base_name = "/food-app-modified-for-backend/";
  const [err, setErr] = useState();

  function toggleB() {
    setShowPassword(!showPassword);
  }

  function toggleCheck() {
    setCheck(!check);
  }
  console.log(check);

  function submitData(event) {
    setLoading(true);
    event.preventDefault();

    const csrftoken = Cookies.get("csrftoken"); // Get CSRF token from cookies

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include", // Include credentials in request
          body: JSON.stringify({ email, password, check }),
        });

        if (response.ok) {
          const data = await response.json();
          setAuth(data.isAuthenticated); 
          if (data.isAuthenticated) {
            navigate(base_name);
          }
        } else if (response.status === 400) {
          const data = await response.json();
          const firstKey = Object.keys(data)[0]; 
          if (firstKey) {
            setErr(data[firstKey][0]);
            console.log(data[firstKey][0]);
          }
        }
      } catch (error) {
        setErr(error);
        console.error("Error during login:", error);
        setAuth(false); // Set auth to false if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }
  // console.log(auth);
  return (
    <div className="bodyl">
      <div className="parent">
        <div className="main">
          <div className="one">
            <div className="login-txt">
              <h1>Login</h1>
              <p>
                Don&apos;t have an account?
                <a href={`${base_name}register`}>Sign up</a>
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
                  <input
                    type="checkbox"
                    name="Remember me"
                    onClick={() => toggleCheck()}
                    value={check}
                  />
                  <label htmlFor="Remember me">Remember me</label>
                </div>
                <a href="#">Forgot Password ?</a>
              </div>
              <p>{err}</p>
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
