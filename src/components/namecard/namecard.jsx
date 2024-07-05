import { useState } from "react";
import "./namecard.css";
import { useContext } from "react";
import { StoreContext } from "./../../context/StoreContext";

function NameCard() {
  const [img, setImg] = useState(null);
  const { detail } = useContext(StoreContext);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      setImg(img);
    }
  };
  console.log(detail);

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
