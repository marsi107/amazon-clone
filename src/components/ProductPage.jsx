import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { ProductDetails } from './'
import { callAPI } from '../utils/CallApi'

const ProductPage = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => { 
    callAPI(`data/products.json`)
    .then((productResults) => {
      setProduct(productResults[id]);
    });
  }

  useEffect(() => {
    getProduct();
  }, []);

  if(!product?.title) return <h1>Loading Product...</h1>

  return (product &&
    <div className="h-screen bg-amazoneClone-bg">      
      <div className="min-w-[1000px] max-w-[1500px] m-auto bg-orange-400">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-3 p-8 rounded bg-white m-auto">
            <img src={`${product.image}`} />
            ProductPage {product.title}
          </div>
          <div className="col-span-5 bg-green-400">
            <div>
              <ProductDetails product={product} ratings={false} />
            </div>
            <div>

            </div>
          </div>
          <div className="col-span-2 bg-pink-400">

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage