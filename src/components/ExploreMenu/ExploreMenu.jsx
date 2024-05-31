/* eslint-disable react/prop-types */
import "./ExploreMenu.css";
<<<<<<< HEAD
// import { menu_list } from "/src/assets/assets.js";
import { useEffect, useState } from "react";

function ExploreMenu({ category, setCategory }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/explore_menu/");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);
  return (
    <>
      {data && (
        <div id="#Explore" className="body">
          <div className="body-heading">
            <h1>Explore Menu</h1>
            <p>
              Choose from a diverse menu featuring a delectable array of dishes,
              one delicious meal at a time.
            </p>
          </div>
          <div className="explore-elements-list">
            {data.map((item, index) => {
              return (
                <div
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.food_name ? "All" : item.food_name
                    )
                  }
                  className="explore-elements-items"
                  key={index}
                >
                  <img
                    className={category === item.food_name ? "active" : ""}
                    src={item.food_image}
                    alt="items"
                  />
                  <p>{item.food_name}</p>
                </div>
              );
            })}
          </div>
          <hr />
        </div>
      )}
=======
import { menu_list } from "/src/assets/assets.js";

function ExploreMenu({category,setCategory}) {
  console.log(category)
  return (
    <>
      <div id="#Explore" className="body">
        <div className="body-heading">
          <h1>Explore Menu</h1>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes,
            one delicious meal at a time.
          </p>
        </div>
        <div className="explore-elements-list">
          {menu_list.map((item, index) => {
            return (
              <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-elements-items" key={index}>
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="items" />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr/>
      </div>
>>>>>>> refs/remotes/origin/main
    </>
  );
}

export default ExploreMenu;

/*
import { useEffect, useState } from "react";
  const [data, setData] = useState();
  const BASE_URL = "http://localhost:8000";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/explore_menu/");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);
  console.log(data);*/
