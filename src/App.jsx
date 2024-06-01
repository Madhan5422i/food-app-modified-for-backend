import { Route, Routes,useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/placeOrder/placeOrder";
import Login from "./pages/login/login";

function App() {
  const base_name = "/food-app-modified-for-backend/";
  const location = useLocation();
  
  return (
    <>
      <div className="app">
      {location.pathname !== `${base_name}login` && <Navbar />}
        <Routes>
          <Route path={`${base_name}`} element={<Home />} />
          <Route path={`${base_name}cart`} element={<Cart />} />
          <Route path={`${base_name}order`} element={<PlaceOrder />} />
        </Routes>
      </div>
      <Routes>
        <Route path={`${base_name}login`} element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
