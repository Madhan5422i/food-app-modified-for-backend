import { useEffect, useState } from "react";
import "./namecard.css";
import { useContext } from "react";
import { StoreContext } from "./../../context/StoreContext";
import Cookies from "js-cookie";

function NameCard() {
  const [img, setImg] = useState(null);
  const { detail } = useContext(StoreContext);

  const handleImageChange = (e) => {
    e.preventDefault();
    const fileInput = e.target; 
    const fetchData = async () => {
      const formData = new FormData();
      formData.append('profile', fileInput.files[0]);
      const csrftoken = Cookies.get("csrftoken");

      const response = await fetch("http://localhost:8000/api/profileupdate/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        alert("Server error. Please check if you are online.");
      } else {
        setImg(data.profile_image);
      }
    };
    fetchData();
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/profileupdate/", {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        alert("Server error. Please check if you are online.");
      } else {
        setImg(data[0].profile_image);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="namecard-container">
      <div className="namecard">
        <div className="img-dive">{img && <img src={img} alt="avatar" />}</div>
        {detail && (
          <div>
            <h3>{detail.firstname}</h3>
            <p>{detail.email}</p>
          </div>
        )}
      </div>
      <form>
        <input
          type="file"
          id="Update"
          name="Update"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label className="button" htmlFor="Update">
          Update
        </label>
      </form>
    </div>
  );
}

export default NameCard;
