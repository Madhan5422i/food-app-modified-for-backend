import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import RegisterC from './../../components/Register/Register';

function Register() {
  const { auth } = useContext(StoreContext);
  const navigate = useNavigate();
  const base_name = "/food-app-modified-for-backend/";

  useEffect(() => {
    if (auth) {
      navigate(base_name);
    }
  }, [auth, navigate, base_name]);

  return <>{!auth && <RegisterC />}</>;

}

export default Register;