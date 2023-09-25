import React from 'react'

const ProductDetails = ({product, ratings}) => {
  return (
    <div className="mb-1">
        <div>{product.title}</div>    
        <div>{product.brand}</div>    
        <div>{product.avgRating}</div>    
        <div>{product.attribute}</div>    
        <div>{product.badge}</div>                    
    </div>
  )
}

export default ProductDetails