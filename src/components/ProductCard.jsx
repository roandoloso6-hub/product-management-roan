import React from 'react';

function ProductCard({ product, onSelect }) {
  return (
    <div className="product-card" onClick={() => onSelect(product)} style={{ cursor: 'pointer' }}>
      {product.quantity < 5 && <span className="low-stock-badge">LOW STOCK</span>}
      <img src={product.image} alt={product.name} className="card-img" />
      <div className="card-name">{product.name}</div>
      <div className="card-price">₱{product.price.toLocaleString()}</div>
    </div>
  );
}

export default ProductCard;