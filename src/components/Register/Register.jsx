import "./register.css";
import { useContext, useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { assets } from "/src/assets/assets.js";

function RegisterC() {
  // eslint-disable-next-line no-unused-vars
  const { auth, setAuth } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err,setErr] = useState()
  const navigate = useNavigate();
  const base_name = "/food-app-modified-for-backend/";

  function toggleB() {
    setShowPassword(!showPassword);
  }

  function submitData(event) {
    setLoading(true);
    event.preventDefault();

    const csrftoken = Cookies.get("csrftoken"); // Get CSRF token from cookies

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include", // Include credentials in request
          body: JSON.stringify({ email, password1, password2 }),
        });

        if (response.ok) {
          const data = await response.json();
          setAuth(data.isAuthenticated);
          console.log(response); // Set auth to true if login is successful
          if (data.isAuthenticated) {
            navigate(base_name); // Redirect to homepage
          }
        } else if (response.status === 400) {
          setAuth(false);
          const data = await response.json();
          const firstKey = Object.keys(data)[0]; // Get the first property name
          if (firstKey) {
            setErr(data[firstKey][0])
            console.log(data[firstKey][0]); // Log the first error message of the first property
          }
        }
      } catch (error) {
        console.log("Error during login:", error);
        setAuth(false); // Set auth to false if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }

  return (
    <>
      <div className="signup-body">
        <div className="signup-parent">
          <div className="signup-main">
            <div className="signup-section">
              <div className="signup-text">
                <h1>Sign up</h1>
                <p>
                  Already have an account?<a href={`${base_name}login`}>Login</a>
                </p>
              </div>
              <form method="post" onSubmit={(e) => submitData(e)}>
                <div className="signup-email-container">
                  <MdEmail className="signup-email-icon" />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="signup-password-container">
                  <MdLock className="signup-password-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  {showPassword ? (
                    <MdVisibilityOff
                      onClick={toggleB}
                      className="signup-eye-icon"
                    />
                  ) : (
                    <MdVisibility
                      onClick={toggleB}
                      className="signup-eye-icon"
                    />
                  )}
                </div>
                <div className="signup-password-container">
                  <MdLock className="signup-password-icon" />
                  <input
                    type="password"
                    // eslint-disable-next-line react/no-unknown-property
                    suggested="current-password"
                    required
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
                <p>{err}</p>
                {loading ? (
                  <div className="signup-loading-container">
                    <CircularProgress
                      style={{ color: "tomato", animationDuration: "10s" }}
                      size={30}
                    />
                  </div>
                ) : (
                  <button type="submit">Sign up</button>
                )}
              </form>
            </div>
            <div>
              <img className="signup-image" src={assets.illu} alt="google" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterC;
