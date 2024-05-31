/* eslint-disable react/prop-types */
<<<<<<< HEAD
import { createContext, useState,useEffect } from "react";
=======
import { createContext, useState } from "react";
>>>>>>> refs/remotes/origin/main

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removrFromCart = (itemId) => {
    if (cartItems[itemId] && cartItems[itemId] > 0) {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

const deleteCartItem = (itemId) => {
  if (cartItems[itemId]) {
    setcartItems((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId];
      return newCartItems;
    });
  }
<<<<<<< HEAD

  
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
=======
};
>>>>>>> refs/remotes/origin/main

  const contextValue = {
    cartItems,
    setcartItems,
    addToCart,
    removrFromCart,
<<<<<<< HEAD
    deleteCartItem,
    food_list
=======
    deleteCartItem
>>>>>>> refs/remotes/origin/main
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
