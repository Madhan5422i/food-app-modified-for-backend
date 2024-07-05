import "./profile.css";
import NameCard from "../../components/namecard/namecard";
import { IoPerson } from "react-icons/io5";
import { FaMoneyCheck, FaBookmark } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { useState } from "react";
import RecentOrders from "./../../components/recentOrders/recent";
import UserInfo from "./../../components/userInfo/userinfo";

function Profile() {
  const [active, setActive] = useState("profile");

  const activeSetter = (id) => {
    setActive(id);
  };
  console.log(active);

  return (
    <>
      <section className="main-section">
        <section className="nav-sec">
          <div className="logi">Tomato.</div>
          <div className="things">
            <div
              className={active === "profile" ? "thing active" : "thing"}
              onClick={() => activeSetter("profile")}
            >
              <div className="icon-container">
                <IoPerson className="icon" />
              </div>
              <h1>Profile</h1>
            </div>
            <div
              className={active === "credits" ? "thing active" : "thing"}
              onClick={() => activeSetter("credits")}
            >
              <div className="icon-container">
                <FaMoneyCheck className="icon" />
              </div>
              <h1>Credits</h1>
            </div>
            <div
              className={active === "wishlist" ? "thing active" : "thing"}
              onClick={() => activeSetter("wishlist")}
            >
              <div className="icon-container">
                <FaBookmark className="icon" />
              </div>
              <h1>Wishlist</h1>
            </div>
            <div
              className={active === "settings" ? "thing active" : "thing"}
              onClick={() => activeSetter("settings")}
            >
              <div className="icon-container">
                <LuSettings2 className="icon" />
              </div>
              <h1>Settings</h1>
            </div>
          </div>
        </section>

        <section>
          {active === "profile" ? (
            <div className="box2">
              <RecentOrders className="RecentOrders" />
              <div className="rights">
                <NameCard />
                <UserInfo className="userinfo" />
              </div>
            </div>
          ) : (
            <p>not</p>
          )}
        </section>
      </section>
    </>
  );
}

export default Profile;
