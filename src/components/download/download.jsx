import { assets } from "../../assets/assets";
import "./download.css";

function Download() {
  return (
    <div className="d-c">
      <h1>For Better Experience Download <br/>Tomato App</h1>
      <div className="images-sec">
        <img src={assets.play_store}/>
        <img src={assets.app_store}/>
      </div>
    </div>
  );
}

export default Download;
