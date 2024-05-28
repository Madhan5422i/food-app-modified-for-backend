import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Download from "../../components/download/download";
import FoodList from "../../components/food-list/food-list";
import "./Home.css";
import { useState } from 'react';

function Home() {
  const [category,setCategory] = useState("All")
  return (
    <>
      <Header />
      <div className="home">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <FoodList category={category} setCategory={setCategory}/>
      <Download/>
      <Footer/>
    </>
  );
}

export default Home;
