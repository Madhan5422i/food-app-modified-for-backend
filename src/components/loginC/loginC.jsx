/* eslint-disable no-unused-vars */
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./loginC.css";
// import { assets } from "/src/assets/assets.js";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
// eslint-disable-next-line no-unused-vars

function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  function toggleB() {
    setShowPassword(!showPassword);
  }
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
          <form>
            <div className="email-cont">
              <MdEmail className="email" />
              <input type="email" placeholder="Email address" />
            </div>
            <div className="pass-cont">
              <MdLock className="pass" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
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
            <button type="submit">Login</button>
          </form>
        </div>
        <div>
          <img className="image" src={assets.loginphoto} alt="google" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginComponent;
