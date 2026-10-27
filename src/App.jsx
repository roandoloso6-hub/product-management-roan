import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import { products as initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Foods', 'Snacks', 'Desserts', 'Beverages'];

  const handleUpdateQuantity = (id, delta) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newQty = p.quantity + delta;
        return { ...p, quantity: newQty < 0 ? 0 : newQty };
      }
      return p;
    }));

    if (selectedProduct && selectedProduct.id === id) {
      const newQty = selectedProduct.quantity + delta;
      setSelectedProduct({ ...selectedProduct, quantity: newQty < 0 ? 0 : newQty });
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.slice(0, 5);

  return (
    <div className="app-container">
      <Navbar 
        cartCount={cart.length} 
        onNavigate={(target) => {
          if (target === 'products') {
            const el = document.getElementById('product-list-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* HERO BANNER */}
        <div className="hero-banner">
          <div className="hero-text-content">
            <h2>Quality Products</h2>
            <p>Discover our best foods and snacks handpicked just for you. Wholesome and fresh everyday.</p>
            <button className="btn-green" onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>
              Shop Now →
            </button>
          </div>
          
          <div className="hero-images-group">
            <img src="/photo design emage.jpg" alt="Photo Design" className="hero-single-img" />
          </div>
        </div>

        {/* FEATURED PRODUCTS SECTION */}
        <section id="featured-products-section" style={{ marginBottom: '35px' }}>
          <h2 className="section-title">Featured Products</h2>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <img src={product.image} alt={product.name} className="card-img" />
                <div className="card-name">{product.name}</div>
                <div className="card-price">₱{product.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT LIST SECTION */}
        <div id="product-list-section" style={{ marginBottom: '50px' }}>
          <ProductList 
            products={filteredProducts} 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="detail-modal-body">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="detail-modal-img" />
              
              <div className="detail-modal-info">
                <h3 style={{ margin: '0 0 8px 0', color: '#10b981' }}>{selectedProduct.name}</h3>
                <p className="detail-meta">Category: {selectedProduct.category} | Rating: ⭐ {selectedProduct.rating}</p>
                <p style={{ fontSize: '0.9rem', color: '#d1d5db' }}>{selectedProduct.description}</p>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}><strong>Specs:</strong> {selectedProduct.specifications}</p>
                
                <div className="detail-price">₱{selectedProduct.price.toLocaleString()}</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span>Quantity:</span>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => handleUpdateQuantity(selectedProduct.id, -1)}>-</button>
                    <span>{selectedProduct.quantity}</span>
                    <button className="qty-btn" onClick={() => handleUpdateQuantity(selectedProduct.id, 1)}>+</button>
                  </div>
                </div>

                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary-green)', marginTop: '8px' }}>
                  Subtotal: ₱{(selectedProduct.price * selectedProduct.quantity).toLocaleString()}
                </div>

                <div className="detail-modal-actions">
                  <button className="btn-green" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                  <button className="btn-cancel" onClick={() => setSelectedProduct(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL (ITO ANG LUMALABAS PAG PININDO ANG + ADD NEW) */}
      {isAddModalOpen && (
        <AddProduct 
          onAddProduct={handleAddProduct} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;