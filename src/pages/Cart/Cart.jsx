import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { food_list, assets } from "../../assets/assets";
import "./Cart.css";

function Cart() {
  const { cartItems, deleteCartItem } = useContext(StoreContext);
  console.log(cartItems);
  const [total, setTotal] = useState(0);
  const [netotal, setneTotal] = useState(2.50);

  useEffect(() => {
    let newTotal = 0;
    let netotal = 0;
    for (let itemId in cartItems) {
      const item = food_list.find((item) => item._id === itemId);
      if (item) {
        newTotal += ((item.price * cartItems[itemId]));
       netotal = newTotal+2.50;
      }
    }
    setTotal(newTotal);
    setneTotal(netotal)
  }, [cartItems]);
  return (
    <>
      <div className="cart-container">
        <div className="items-container">
          <h1>Your Basket</h1>
          {total==0 ? <p>cart is empty</p> :
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
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
                    <p>{cartItems[item._id]}</p>
                  </div>
                  <p className="tot-price">
                    ${item.price * cartItems[item._id]}
                  </p>

                  <img
                    className="x-image"
                    onClick={() => deleteCartItem(item._id)}
                    src={assets.cross_icon}
                  />
                </div>
              );
            }})
          
          }
        </div>
        <div className="continue">
          <div className="amt">
            <h3>
              SubTotal :<span>${total}</span>
            </h3>
            <hr />
            <h3>
              Shipping Fee : {total!==0 ? <span>$2.50</span>:<p>--</p>}
            </h3>
            <hr/>
            <h2 className="grnd">
              Total : <span>${netotal}</span>
            </h2>
          </div>
          <div className="promo">
            <input type="text" placeholder="Apply Promo code" />
            <button>Apply</button>
          </div>
          <button className="continue-btn">Continue to Payment</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
