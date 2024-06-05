import "./login.css";
import LoginComponent from "./../../components/loginC/loginC";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { auth } = useContext(StoreContext);
  const navigate = useNavigate();
  const base_name = "/food-app-modified-for-backend/";
  return <>{auth ? navigate(base_name) : <LoginComponent />}</>;
}

export default Login;
