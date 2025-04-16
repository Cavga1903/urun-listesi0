import { useEffect, useState } from "react";
import "./CartPanel.css";

export default function CartPanel({ cart, onClose, setCart }) {
  const [isOpen, setIsOpen] = useState(false);

  // İlk render'dan sonra class ekle (animasyon başlasın)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 10); // çok kısa bir gecikme
    return () => clearTimeout(timeout);
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.priceTL || 0),
    0
  );

  const removeFromCart = (indexToRemove) => {
    const updated = cart.filter((_, index) => index !== indexToRemove);
    setCart(updated);
  };

  return (
    <div className={`cart-panel ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <h2>Sepetim 🛒</h2>
      {cart.length === 0 ? (
        <p>Sepet boş.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <strong>{item.titleTr || item.title}</strong>
                  <p>{item.priceTL} TL</p>
                </div>
                <button onClick={() => removeFromCart(index)}>🗑</button>
              </li>
            ))}
          </ul>
          <hr />
          <p className="cart-total">
            Toplam: <strong>{total.toFixed(2)} TL</strong>
          </p>
        </>
      )}
    </div>
  );
}