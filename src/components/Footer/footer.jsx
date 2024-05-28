import "./footer.css";
import { assets } from "./../../assets/assets";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="foot-left">
          <img className="logo" src={assets.logo} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut unde ea
            maiores eos impedit expedita iste esse corporis fugit, a, hic
            eveniet quidem nihil vel delectus nobis velit perferendis ipsum.
          </p>
          <div className="foot-soc">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="foot-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Delivery</li>
          </ul>
        </div>
        <div className="foot-right">
          <h2>Get in Touch</h2>
          <section>
            <p>+91-wrong</p>
            <p>madhanofficl@gmail.com</p>
          </section>
        </div>
      </footer>
    </>
  );
}

export default Footer;
