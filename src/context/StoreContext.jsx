/* eslint-disable react/prop-types */
import { createContext, useState,useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const addToCart = (itemId) => {
    itemId = Number(itemId)
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

const removrFromCart = (itemId) => {
  itemId = Number(itemId)
  if (cartItems[itemId] && cartItems[itemId] > 1) {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  } else if (cartItems[itemId] && cartItems[itemId] === 1) {
    setcartItems((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId];
      return newCartItems;
    });
  }
};

const deleteCartItem = (itemId) => {
  itemId = Number(itemId)
  if (cartItems[itemId]) {
    setcartItems((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId];
      return newCartItems;
    });
  }

  
};
const [food_list, setfood_list] = useState();

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/itemList/");
    const jsonData = await response.json();
    setfood_list(jsonData);
  };
  fetchData();
}, []);

  const contextValue = {
    cartItems,
    setcartItems,
    addToCart,
    removrFromCart,
    deleteCartItem,
    food_list
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
