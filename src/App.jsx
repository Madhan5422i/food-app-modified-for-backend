import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/placeOrder/placeOrder";
// import Footer from "./components/Footer/footer";

function App() {
  return (
    <Router basename="/food-app-modified-for-backend-">
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Order" element={<PlaceOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
