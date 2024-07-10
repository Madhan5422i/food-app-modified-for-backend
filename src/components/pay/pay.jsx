/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./pay.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from './../../context/StoreContext';

function Pay({ amount, onButtonClick }) {
  const {total} = useContext(StoreContext);

  return (
    <>
      <section className="pay">
        <div>
          <div className="pay-icons">
            <img src={assets.visa} alt="visa/matsercard" />
            <img src={assets.upi} alt="upi" />
            <img src={assets.bank} alt="netbanking" />
          </div>
          <div className="seperator">
            <div className="pay-info">
              <i>All above payment methods are accepted here.</i>
              <br />
            </div>
            <div className="boxer"> 
              <h1>Pay with RazorPay</h1>
              <button onClick={onButtonClick}>
                Pay <span>{amount}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pay;
