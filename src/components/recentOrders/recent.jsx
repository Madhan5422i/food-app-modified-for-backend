import "./recent.css";
import { FaHistory } from "react-icons/fa";

function RecentOrders() {
  return (
    <>
    <section className="boxe">
      <div className="recent-title">
        <h1>Recent Orders</h1>
        <FaHistory className="hsi" />
      </div>
      <div className="recent-orders">
        <div className="order">
          <div className="order-image">
            <img
              src="https://images.unsplash.com/photo-1622838325260-3e4f1b3b6e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="order"
            />
          </div>
          <div className="order-details">
            <h3>Order ID: 123456</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="order">
          <div className="order-image">
            <img
              src="https://images.unsplash.com/photo-1622838325260-3e4f1b3b6e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="order"
            />
          </div>
          <div className="order-details">
            <h3>Order ID: 123456</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="order">
          <div className="order-image">
            <img
              src="https://images.unsplash.com/photo-1622838325260-3e4f1b3b6e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="order"
            />
          </div>
          <div className="order-details">
            <h3>Order ID: 123456</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="order">
          <div className="order-image">
            <img
              src="https://images.unsplash.com/photo-1622838325260-3e4f1b3b6e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="order"
            />
          </div>
          <div className="order-details">
            <h3>Order ID: 123456</h3>
            <p>Delivered</p>
          </div>
        </div>
        <div className="order">
          <div className="order-image">
            <img
              src="https://images.unsplash.com/photo-1622838325260-3e4f1b3b6e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="order"
            />
          </div>
          <div className="order-details">
            <h3>Order ID: 123456</h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

export default RecentOrders;
