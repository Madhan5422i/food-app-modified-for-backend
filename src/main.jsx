/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider, {
  ItemNamesProvider,
} from "./context/StoreContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <ItemNamesProvider>
        <App />
      </ItemNamesProvider>
    </StoreContextProvider>
  </BrowserRouter>
);
