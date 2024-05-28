import "./Header.css";
// import headerImage from './header_img.png';

function Header() {
  return (
    <>
      <div className="header">
        <div className="header-elements">
          <div className="header-content">
            <h2>
              Order your <br />
              favourite food here !!
            </h2>
            <p>
              Choose from a diverse menu featuring a delectable array of dishes
              crafted with finest ingredients.Our mission is to satisfy your
              cravings and elevate your dining experience, one delicious meal at
              a time.
            </p>
            <button>View Menu</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
