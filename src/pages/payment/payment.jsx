import { useEffect } from "react";
import { assets } from './../../assets/assets';

function Payment() {
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

  async function displayRazorpay() {
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
        callback_url: "http://127.0.0.1:8000/api",
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
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Buy React now!</p>
        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header>
    </div>
  );
}

export default Payment;