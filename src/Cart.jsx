import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { state } = useLocation(); // sepetteki ürünler burada

  if (!state || state.length === 0) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Sepet Boş 🛒</h2>
        <button onClick={() => navigate(-1)}>← Geri Dön</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sepetim 🛒</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {state.map((item, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#fff",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{item.titleTr || item.title}</strong> — {item.priceTL} TL
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>← Alışverişe Devam Et</button>
    </div>
  );
}