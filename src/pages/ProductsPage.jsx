import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductsPage({
  showHeader = true,
  selectedCategory = "All",
  search = "",
  homeMode = false,
}) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // load products + cart
  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, cartRes] = await Promise.all([
          api.get("/products"),
          api.get("/cart"),
        ]);
        setProducts(prodRes.data);
        setCartItems(cartRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const refreshCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getQuantity = (productId) => {
    const item = cartItems.find((c) => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const increaseQty = async (product) => {
    try {
      const existing = cartItems.find((c) => c.productId === product.id);
      if (existing) {
        await api.put(`/cart/${existing.id}`, {
          ...existing,
          quantity: existing.quantity + 1,
        });
      } else {
        await api.post("/cart", {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }
      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (product) => {
    try {
      const existing = cartItems.find((c) => c.productId === product.id);
      if (!existing) return;

      if (existing.quantity <= 1) {
        await api.delete(`/cart/${existing.id}`);
      } else {
        await api.put(`/cart/${existing.id}`, {
          ...existing,
          quantity: existing.quantity - 1,
        });
      }
      await refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ---- CATEGORY FILTER LOGIC ----
  const filterByCategory = (product) => {
    if (selectedCategory === "All") return true;

    const cat = (product.category || "").toLowerCase();

    const map = {
      "Fruits & Vegetables": ["fruit", "vegetable"],
      "Dairy & Bakery": ["dairy", "bakery"],
      Beverages: ["beverage", "drink"],
      Snacks: ["snack"],
      Household: ["household"],
      "Personal Care": ["personal", "care"],
    };

    const keys = map[selectedCategory];
    if (!keys) return true;

    return keys.some((k) => cat.includes(k));
  };

  // ---- SEARCH FILTER LOGIC (tolerant, word-based) ----
  const matchesSearch = (product) => {
    const term = search.trim().toLowerCase();
    if (!term) return true; // no search text => match all

    const text = (
      (product.name || "") +
      " " +
      (product.category || "") +
      " " +
      (product.description || "")
    ).toLowerCase();

    // exact phrase match
    if (text.includes(term)) return true;

    // word-based match: if ANY word of the search appears in product text
    const words = term.split(/\s+/).filter((w) => w.length >= 2);
    if (!words.length) return true;

    return words.some((w) => text.includes(w));
  };

  // combine filters
  let visibleProducts = products.filter(
    (p) => filterByCategory(p) && matchesSearch(p)
  );

  // Home page: show only 8 random products each time
  if (homeMode) {
    visibleProducts = [...visibleProducts]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }

  if (loading) {
    return <p className="section-subtitle">Loading products...</p>;
  }

  return (
    <section>
      {showHeader && (
        <div className="section-heading">
          <div>
            <h2 className="section-title">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="section-subtitle">
              Browse items available in GrocerEase store.
            </p>
          </div>
        </div>
      )}

      <div className="products-grid">
        {visibleProducts.map((p) => {
          const qty = getQuantity(p.id);
          return (
            <article key={p.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <span className="product-category">{p.category}</span>
                  <span className="product-stock">In stock: {p.stock}</span>
                </div>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-description">{p.description}</p>
                <div className="product-price-row">
                  <span className="product-price">₹{p.price}</span>
                  <span className="product-unit">per {p.unit}</span>
                </div>

                {qty === 0 ? (
                  <button
                    className="btn-add"
                    onClick={() => increaseQty(p)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="qty-inline">
                    <button onClick={() => decreaseQty(p)}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => increaseQty(p)}>+</button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {visibleProducts.length === 0 && (
        <p className="section-subtitle" style={{ marginTop: "0.75rem" }}>
          No products found.
        </p>
      )}
    </section>
  );
}
