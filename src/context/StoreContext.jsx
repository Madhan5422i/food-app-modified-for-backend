/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

// Create a context
const ItemNamesContext = createContext();

// Context provider component
export const ItemNamesProvider = ({ children }) => {
  const [itemNames, setItemNames] = useState([]);

  return (
    <ItemNamesContext.Provider value={{ itemNames, setItemNames }}>
      {children}
    </ItemNamesContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useItemNames = () => useContext(ItemNamesContext);

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [auth, setAuth] = useState(false);
  const [detail, setDetail] = useState({});
  const base_name = "/food-app-modified-for-backend/";
  const [total, setTotal] = useState(0);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/checkAuth/", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setDetail(data.data);
        console.log(data.data);
        setAuth(data.isAuthenticated);
        return data.isAuthenticated, data.data;
      } else {
        setAuth(false);
        setDetail({});
        return false;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuth(false);
      setDetail({});
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, []);

  // console.log(checkAuth())

  const addToCart = (itemId) => {
    itemId = Number(itemId);
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    itemId = Number(itemId);
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });
  };

  const deleteCartItem = (itemId) => {
    itemId = Number(itemId);
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId];
      return newCartItems;
    });
  };

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/itemList/");
      const jsonData = await response.json();
      setFoodList(jsonData);
    };
    fetchData();
  }, []);



  useEffect(() => {
    const calculateCartTotal = () => {
      let total = 0;
      Object.keys(cartItems).forEach((itemId) => {
        const item = foodList.find((item) => item.id === Number(itemId));
        if (item) {
          total += item.price * cartItems[itemId];
        }
      });
      setTotal(total);
    };
    calculateCartTotal();
    console.log("total in t", total);
  }, [total, cartItems, foodList]);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteCartItem,
    foodList,
    auth,
    setAuth,
    checkAuth,
    detail,
    setDetail,
    base_name,
    total,
    setTotal,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
