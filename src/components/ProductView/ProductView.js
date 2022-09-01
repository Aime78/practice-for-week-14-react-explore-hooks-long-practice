import React from 'react';
import { useState, useEffect } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(Boolean(localStorage.getItem('open')) || true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selected, setSelected] = useState(false)

  // Open side panel when product is selected
  useEffect(() => {
    if(selectedProduct)
      setSideOpen(true)
  }, [selectedProduct])

  // Deselect product when side panel is closed
  useEffect(() => {
    if(!sideOpen)
      setSelectedProduct()
  },[sideOpen])

  useEffect(() => {
    localStorage.setItem('open', sideOpen)
  },[sideOpen])

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={selected}
              onClick={() => {
                setSelectedProduct(item)
                setSelected(!selected)
              }}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct}/>
      </div>
    </div>
  );
}

export default ProductView;