import React from 'react';

function Sidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside style={{
      width: '220px',
      backgroundColor: '#111827',
      border: '1px solid #1f2937',
      borderRadius: '10px',
      padding: '18px',
      height: 'fit-content',
      flexShrink: 0
    }}>
      <h3 style={{
        fontSize: '1rem',
        color: '#10b981',
        marginBottom: '12px',
        borderBottom: '1px solid #1f2937',
        paddingBottom: '8px',
        fontWeight: '700'
      }}>
        Categories
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              style={{
                background: isSelected ? '#10b981' : 'transparent',
                color: isSelected ? '#ffffff' : '#9ca3af',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                textAlign: 'left',
                fontWeight: isSelected ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;