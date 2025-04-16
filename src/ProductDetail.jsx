import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetail({ setCart }) {
  const { state } = useLocation(); // Tıklanan ürünün verisi burada
  const navigate = useNavigate();

  if (!state) return <p>Ürün bulunamadı.</p>;

  return (
    <div style={{ padding: "40px" }}>
      {/* Geri Dön Butonu */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#3b82f6",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Geri Dön
      </button>

      {/* Ürün Detayları */}
      <h2>{state.titleTr || state.title}</h2>
      <img src={state.image} alt={state.title} style={{ width: "200px" }} />
      <p>
        <strong>Kategori:</strong> {state.categoryTr || state.category}
      </p>
      <p>
        <strong>Açıklama:</strong> {state.description}
      </p>
      <p>
        <strong>Fiyat:</strong> {state.priceTL} TL
      </p>

      {/* Sepete Ekle Butonu */}
      <button
        onClick={() => {
          setCart((prev) => [...prev, state]); // sepete ekle
          alert(` "${state.titleTr || state.title}" sepete eklendi!`);
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#10b981",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Sepete Ekle
      </button>
    </div>
  );
}