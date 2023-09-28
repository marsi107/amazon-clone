import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ProductDetails } from './'
import { addToCart } from '../redux/cartSlice'
import { callAPI } from '../utils/CallApi'
import { ES_CURRENCY } from '../utils/constants'

const ProductPage = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();

  const getProduct = () => { 
    callAPI(`data/products.json`)
    .then((productResults) => {
      setProduct(productResults[id]);
    });
  }

  const addQuantityToProduct = () => { 
    setProduct(product.quantity = quantity);
    return product;
  }

  useEffect(() => {
    getProduct();
  }, []);

  if(!product?.title) return <h1>Loading Product...</h1>

  return (product &&
    <div className="h-screen bg-amazoneClone-bg">      
      <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
        {/* Left cell */}
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-3 p-8 rounded bg-white m-auto">
            <img src={`${product.image}`} />
          </div>
          {/* Middle cell */}
          <div className="col-span-5 bg-white p-4 rounded divide-y divide-gray-400">
            <div className="mb-3">
              <ProductDetails product={product} ratings={true} />
            </div>
            <div className="text-base xl:text-lg mt-3">
              {product.description}
            </div>
          </div>
          {/* Right cell */}
          <div className="col-span-2 bg-white p-4 rounded">
            <div className="text-xl xl:text-2xl font-semibold">
              {ES_CURRENCY.format(product.price)}
            </div>
            <div className="text-base xl:text-lg font-semibold text-gray-500">
              <span className="line-through">{ES_CURRENCY.format(product.oldPrice)}</span>
            </div>
            <div className="text-sm xl:text-base font-semibold text-blue-500 mt-3">
              FREE Returns
            </div>
            <div className="text-sm xl:text-base font-semibold text-blue-500 mt-1">
              FREE Delivery
            </div>
            <div className="text-base xl:text-lg font-semibold text-green-700 mt-1">
              In Stock
            </div>
            <div className="text-base xl:text-lg mt-1">
              Quantity:
              <select 
              className="p-2 bg-white border rounded-md focus:border-indigo-600 ml-1" 
              name="quantitySelection"
              onChange={(e) => setQuantity(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <Link to={"/checkout"}>
              <button 
              className="btn"
              onClick={() => dispatch(addToCart(addQuantityToProduct()))}
              >
                Add to Cart
              </button>
            </Link>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage