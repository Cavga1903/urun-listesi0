import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import CartPanel from "./CartPanel";

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [translatedProducts, setTranslatedProducts] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Ürünleri çek
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Ürün verisi alınamadı."))
      .finally(() => setLoading(false));
  }, []);

  // Döviz kuru çek
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates.TRY))
      .catch(() => setError("Döviz kuru alınamadı."));
  }, []);

  // Ürünleri çevir ve TL'ye çevir
  useEffect(() => {
    const translateText = async (text) => {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|tr`;
      const res = await fetch(url);
      const json = await res.json();
      return json.responseData.translatedText;
    };

    const translateAll = async () => {
      try {
        const translated = await Promise.all(
          products.map(async (product) => {
            const titleTr = await translateText(product.title).catch(
              () => product.title
            );
            const categoryTr = await translateText(product.category).catch(
              () => product.category
            );

            return {
              ...product,
              titleTr: titleTr.includes("MYMEMORY") ? product.title : titleTr,
              categoryTr: categoryTr.includes("MYMEMORY")
                ? product.category
                : categoryTr,
              priceTL: exchangeRate
                ? (product.price * exchangeRate).toFixed(2)
                : "?",
            };
          })
        );
        setTranslatedProducts(translated);
      } catch {
        setError("Çeviri yapılırken bir hata oluştu.");
      }
    };

    if (products.length > 0 && exchangeRate) translateAll();
  }, [products, exchangeRate]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* Sepetim Butonu */}
      <div style={{ padding: "10px", textAlign: "right" }}>
        <button
          onClick={() => setCartOpen(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Sepetim ({cart.length})
        </button>
      </div>

      {/* Sayfa Rotaları */}
      <Routes>
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/"
          element={
            <div className="container">
              <h1>Ürün Listesi</h1>
              <div className="grid">
                {translatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="card"
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: product })
                    }
                  >
                    <img src={product.image} alt={product.title} />
                    <h3>{product.titleTr}</h3>
                    <p>Kategori: {product.categoryTr}</p>
                    <p className="price">{product.priceTL} TL</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail setCart={setCart} />}
        />
      </Routes>

      {/* Sepet Paneli */}
      {cartOpen && (
        <CartPanel
          cart={cart}
          setCart={setCart}
          onClose={() => setCartOpen(false)}
          className={cartOpen ? "open" : ""}
        />
      )}
    </>
  );
}

export default App;
