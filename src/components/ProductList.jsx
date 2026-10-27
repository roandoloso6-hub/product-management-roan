import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, categories, selectedCategory, onCategoryChange, onOpenAddModal, onSelectProduct }) {
  return (
    <section>
      <div className="list-header-controls" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 className="section-title" style={{ margin: 0 }}>Product List</h2>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
            className="category-select"
            style={{
              backgroundColor: '#111827',
              color: '#fff',
              border: '1px solid #1f2937',
              padding: '7px 12px',
              borderRadius: '6px',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button 
            onClick={onOpenAddModal}
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '6px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={onSelectProduct} 
            />
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductList;