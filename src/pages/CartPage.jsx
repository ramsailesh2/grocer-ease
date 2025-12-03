import { useEffect, useState } from "react";
import api from "../services/api";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");

  const loadCart = () => {
    api
      .get("/cart")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (item, newQty) => {
    if (newQty <= 0) {
      await removeItem(item.id);
      return;
    }
    await api.put(`/cart/${item.id}`, { ...item, quantity: newQty });
    loadCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    loadCart();
  };

  const checkout = async () => {
    // clear all cart items
    for (const item of items) {
      await api.delete(`/cart/${item.id}`);
    }
    loadCart();
    setOrderMessage("Order placed successfully!");
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <div className="section-heading">
          <h2 className="section-title">Your Cart</h2>
        </div>
        {orderMessage && (
          <p className="cart-success">{orderMessage}</p>
        )}
        <p className="cart-empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="section-heading">
        <h2 className="section-title">Your Cart</h2>
      </div>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-left">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-thumb"
              />
            ) : (
              <div className="cart-item-thumb cart-item-thumb-placeholder">
                {item.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="cart-item-right">
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-line">
                ₹{item.price} × {item.quantity} ={" "}
                <span className="cart-item-total">
                  ₹{item.price * item.quantity}
                </span>
              </p>
            </div>

            <div className="cart-item-controls">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item, item.quantity - 1)}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="btn-remove"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-footer">
        <div className="cart-total">Total: ₹{total}</div>
        <button className="btn-checkout" onClick={checkout}>
          Checkout
        </button>
      </div>

      {orderMessage && (
        <p className="cart-success">{orderMessage}</p>
      )}
    </section>
  );
}
