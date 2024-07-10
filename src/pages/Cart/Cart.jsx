import { useContext, useState, useEffect,useMemo } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useItemNames } from "../../context/StoreContext";

function Cart() {
  const { cartItems, deleteCartItem, foodList, base_name } = useContext(StoreContext);
  console.log(cartItems);
  const [total, setTotal] = useState(0);
  const [netotal, setneTotal] = useState(2.5);

  const navigate = useNavigate();
  // const itemId = Number(itemId)

  useEffect(() => {
    let newTotal = 0;
    let netotal = 0;
    for (let itemId in cartItems) {
      const item = foodList.find((item) => item.id == itemId);
      if (item) {
        newTotal += item.price * cartItems[itemId];
        netotal = newTotal + 2.5;
      }
    }
    setTotal(newTotal);
    setneTotal(netotal);
  }, [cartItems, foodList]);

  console.log("cartItems", cartItems);
  console.log("food_list", foodList);


  
  // Inside your component
  const itemNames = useMemo(() => {
    return Object.keys(cartItems)
      .map((itemId) => {
        const item = foodList.find((item) => item.id == itemId);
        if (item) {
          return {
            item: item.name,
            quantity: cartItems[itemId],
            item_price: item.price,
            price: item.price * cartItems[itemId],
          };
        }
        return null; // Ensure to return null or similar for non-matching items
      })
      .filter((item) => item); // This will remove any null values from the array
  }, [cartItems, foodList]); // Dependencies array
  
  console.log(itemNames);

  const { setItemNames } = useItemNames();
  useEffect(() => {
    setItemNames(itemNames); // Update the context only when itemNames changes
  }, [itemNames,setItemNames]); // Dependency array, re-run this effect when itemNames changes
  

  const submitData = () => {
    if (total > 0) {
      // const fetchData = async () => {
      //   const options = {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(itemNames),
      //   };
      //   const response = await fetch(
      //     "http://localhost:8000/api/cartData/",
      //     options
      //   );
      //   const jsonData = await response.json();
      //   setResult(jsonData);
      // };
      // fetchData();
      navigate(base_name + "payment");
    }

  };
  console.log(foodList);
  //console.log(result);


  return (
    <>
      <div className="cart-container">
        <div className="items-container">
          <h1>Your Basket</h1>
          {total == 0 ? (
            <p>cart is empty</p>
          ) : (
            foodList &&
            foodList.map((item, index) => {
              if (cartItems[item.id] > 0) {
                return (
                  <div className="single-item" key={index}>
                    <div className="part-1">
                      <img className="item-image" src={item.image} />
                      <div className="part-1-details">
                        <h2>{item.name}</h2>
                        <p>
                          Price : <span>${item.price}</span>
                        </p>
                      </div>
                    </div>
                    <div className="quantity">
                      <span>Quantity</span>
                      <p>{cartItems[item.id]}</p>
                    </div>
                    <p className="tot-price">
                      ${item.price * cartItems[item.id]}
                    </p>

                    <img
                      className="x-image"
                      onClick={() => deleteCartItem(item.id)}
                      src={assets.cross_icon}
                    />
                  </div>
                );
              }
            })
          )}
        </div>
        <div className="continue">
          <div className="amt">
            <h3>
              SubTotal :<span>${total}</span>
            </h3>
            <hr />
            <h3>
              Shipping Fee : {total !== 0 ? <span>$2.50</span> : <p>--</p>}
            </h3>
            <hr />
            <h2 className="grnd">
              Total : <span>${netotal}</span>
            </h2>
          </div>
          <div className="promo">
            <input type="text" placeholder="Apply Promo code" />
            <button>Apply</button>
          </div>

          {/* <Link to={`${base_name}payment`}> */}
            <button onClick={() => submitData()} className="continue-btn">
              Continue to Payment
            </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
export default Cart;
