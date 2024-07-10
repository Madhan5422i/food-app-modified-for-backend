/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { assets } from "./../../assets/assets";
import UserInfo from "./../../components/userInfo/userinfo";
import "./payment.css";

import { useItemNames } from "../../context/StoreContext";
import Pay from './../../components/pay/pay';

function Payment() {
  const { itemNames } = useItemNames();
  const [result, setResult] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js")
      .then((loaded) => {
        if (!loaded) {
          console.error("Failed to load Razorpay SDK");
        }
      })
      .catch((error) => console.error("Error loading Razorpay SDK:", error));
  }, []);

  function loadRazorpayScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load script"));
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/payment");
      if (!response.ok) {
        alert("Server error. Please check if you are online.");
        return;
      }
      else {
        const {amount}= await response.json();
        setAmount(amount);
      }
    };
    fetchData();
  }, []);

  const DisplayRazorpay = async () => {
    

    const fetchData = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemNames),
      };
      const response = await fetch(
        "http://localhost:8000/api/cartData/",
        options
      );
      const jsonData = await response.json();
      setResult(jsonData);
    };
    fetchData();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/payment");
      if (!response.ok) {
        alert("Server error. Please check if you are online.");
        return;
      }

      const { merchantId, amount, currency, orderId } = await response.json();
      const options = {
        key: merchantId,
        amount: amount.toString(),
        currency: currency,
        name: "Tomato",
        description: "Payment Cart",
        image: assets.illu,
        order_id: orderId,
        callback_url: "http://127.0.0.1:8000/api/postinfo/",
        redirect: true,
        prefill: {
          name: "Swapnil Pawar",
          email: "swapnil@example.com",
          contact: "6383357010",
        },
        notes: {
          address: "None",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Appi">
      <header className="App-header">
        <div className="usif">
          <UserInfo />
        </div>
        <Pay amount={amount} onButtonClick={DisplayRazorpay} />
      </header>
    </div>
  );
}

export default Payment;
