import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load login from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("grocereaseUserEmail");
    if (stored) setUserEmail(stored);
  }, []);

  // helper to select a category and go to shop page
  const goToCategory = (cat) => {
    setSelectedCategory(cat);
    navigate("/products");
  };

  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">
          {/* LEFT: logo (home) */}
          <div className="nav-left" onClick={() => navigate("/")}>
            <div className="brand">
              <div className="brand-logo">G</div>
              <div className="brand-name">GrocerEase</div>
            </div>
          </div>

          {/* CENTER: big search bar */}
          <form
            className="nav-center"
            onSubmit={(e) => {
              e.preventDefault();
              // go to shop page when pressing Enter / Search button
              navigate("/products");
            }}
          >
            <input
              type="text"
              className="nav-center-input"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="nav-center-button" type="submit">
              Search
            </button>
          </form>

          {/* RIGHT: profile + cart */}
          <div className="nav-right">
            <button
              type="button"
              className="nav-auth"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              type="button"
              className="nav-cart"
              onClick={() => navigate("/cart")}
            >
              🛒
            </button>
          </div>
        </div>

        {/* CATEGORIES BAR */}
        <div className="nav-categories">
          <div className="nav-cat-inner">
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("All")}
            >
              ☰ All Categories
            </button>
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("Fruits & Vegetables")}
            >
              Fruits & Vegetables
            </button>
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("Dairy & Bakery")}
            >
              Dairy & Bakery
            </button>
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("Beverages")}
            >
              Beverages
            </button>
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("Snacks")}
            >
              Snacks
            </button>
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("Household")}
            >
              Household
            </button>
            <button
              className="nav-cat-item"
              onClick={() => goToCategory("Personal Care")}
            >
              Personal Care
            </button>
          </div>
        </div>
      </header>

      {/* MAIN PAGES */}
      <main className="page-inner">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                {/* Hero */}
                <section className="hero">
                  <div>
                    <p className="hero-text-small">
                      FRESH • FAST • CONVENIENT
                    </p>
                    <h1 className="hero-title">
                      Your daily{" "}
                      <span className="hero-highlight">grocery store</span>,
                      delivered at your doorstep.
                    </h1>
                    <p className="hero-subtitle">
                      Browse fresh fruits and vegetables, dairy, staples and
                      household essentials – add them to your cart and check
                      out in a few clicks.
                    </p>
                    <div className="hero-actions">
                      <button
                        className="btn-primary"
                        onClick={() => navigate("/products")}
                      >
                        Start Shopping
                      </button>
                      <button
                        className="btn-secondary-link"
                        onClick={() => navigate("/profile")}
                      >
                        {userEmail ? "View Profile" : "Login"}
                      </button>
                    </div>
                  </div>

                  <div className="hero-badge">
                    <div className="hero-badge-main">Delivery in 30–45 min</div>
                    <div className="hero-badge-sub">
                      Free delivery above ₹499 • Fresh stock daily
                    </div>
                  </div>
                </section>

                {/* Featured section on home */}
                <div className="section-heading">
                  <div>
                    <h2 className="section-title">Featured Products</h2>
                  </div>
                </div>

                {/* homeMode = true -> only 8 random products */}
                <ProductsPage
                  showHeader={false}
                  selectedCategory={selectedCategory}
                  search={search}
                  homeMode={true}
                />
              </>
            }
          />

          {/* SHOP / PRODUCTS */}
          <Route
            path="/products"
            element={
              <ProductsPage
                showHeader={true}
                selectedCategory={selectedCategory}
                search={search}
                homeMode={false}
              />
            }
          />

          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <ProfilePage userEmail={userEmail} setUserEmail={setUserEmail} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
