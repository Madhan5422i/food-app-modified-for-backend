/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { assets, food_list } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./food-list.css";
import { useState, useEffect, useContext } from "react";

function FoodList({ category }) {
  const [food_list, setfood_list] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/itemList/");
      const jsonData = await response.json();
      setfood_list(jsonData);
    };
    fetchData();
  }, []);
  return (
    <>
      {food_list && (
        <div>
          <h1 className="food-list-heading">Top dishes near you</h1>
          <div className="food-list-component">
            {food_list
              .filter(
                (food) => category === "All" || food.category === category
              )
              .map((food) => (
                <FoodItem key={food.id} food={food} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
function FoodItem({ food }) {
  const { cartItems, addToCart, removrFromCart } = useContext(StoreContext);


  const count = cartItems[food.id] || 0;

  const takeDataInc = (c, id) => {
    addToCart(id);
  };

  const takeDataDec = (c, id) => {
    removrFromCart(id);
  };

  useEffect(() => {
    console.log(food.name, count);
  }, [food.name, count]);



  return (
    <>
      {food_list && (
        <div className="food-list" key={food.id}>
          <img src={food.image} alt={food.name} />
          <div className="count-buttons-container">
            {!count ? (
              <div className="when-single">
                <img
                  onClick={() => takeDataInc(food.name, food.id)}
                  src={assets.add_icon_white}
                />
              </div>
            ) : (
              <div className="when-active">
                <img
                  onClick={() => takeDataInc(food.name, food.id)}
                  src={assets.add_icon_green}
                />
                <p>{count}</p>
                <img
                  onClick={() => takeDataDec(food.name, food.id)}
                  src={assets.remove_icon_red}
                />
              </div>
            )}
          </div>

          <div className="food-name-rating">
            <h2>{food.name}</h2>
            <img className="rating" src={assets.rating_starts} />
          </div>

          <div className="food-details">
            <p>{food.description}</p>
            <h3>${food.price}</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodList;
