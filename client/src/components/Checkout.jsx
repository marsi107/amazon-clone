import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductDetails } from './'
import { removeFromCart } from '../redux/cartSlice'
import { ES_CURRENCY } from '../utils/constants'

const Checkout = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://amazon-clone-4fgu.onrender.com';
  const products = useSelector((state) => state.cart.products);
  const productsNumber = useSelector((state) => state.cart.productsNumber);
  const subtotal = useSelector((state) =>
    state.cart.products.reduce((subtotal, product) =>
      subtotal + (product.price * product.quantity), 0
    )
  );
  const dispatch = useDispatch();

  const onHandleCheckoutClick = () => {
    const params = {
      products: products
    };

    fetch(SERVER_URL + "/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
  }

  return (
    <div className="h-screen bg-amazoneClone-bg">
      <div className="min-w-[1000px] max-w-[1500px] m-auto pt-8">
        <div className="grid grid-cols-8 gap-10">
          {/*Products*/}
          <div className="col-span-6 bg-white">
            <div className="text-2xl xl:text-3xl m-4">
              Shopping Cart
            </div>
            {
              products.map(product => {
                return (
                  <div key={product.id}>
                    <div className="grid grid-cols-12 divide-y divide-gray-400 mr-4">
                      <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                        <div className="col-span-2">
                          <Link to={`/product/${product.id}`}>
                            <img className="p-4 m-auto" src={product.image_small} alt="" />
                          </Link>
                        </div>
                        <div className="col-span-6">
                          <div className="font-medium text-black mt-2">
                            <Link to={`/product/${product.id}`}>
                              <ProductDetails product={product} ratings={false} />
                            </Link>
                          </div>
                          <div>
                            <button className="text-sm xl:text-base font-semibold rounded text-blue-500 mt-2 mb-1"
                              onClick={() => dispatch(removeFromCart(product.id))}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-3 w-20 text-center">
                            <span className="text-xl xl:text-2xl bg-gray-400 rounded">-</span>
                            <span className="text-lg xl:text-xl bg-gray-300">{product.quantity}</span>
                            <span className="text-xl xl:text-2xl bg-gray-400 rounded">+</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-lg xl:text-xl mt-2 mr-4 font-semibold">
                          {ES_CURRENCY.format(product.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className="text-lg xl:text-xl text-right mb-4 mr-4">
              Subtotal ({productsNumber} items): <span className="font-semibold">{ES_CURRENCY.format(subtotal)}</span>
            </div>
          </div>
          {/*Checkout*/}
          <div className="col-span-2 bg-white rounded h-[250px] p-7">
            <div className="text-xs xl:text-sm text-green-800 mb-2">
              Your order qualifies for <span className="font-bold">FREE DELIVERY</span>.
              Delivery Details
            </div>
            <div className="text-base xl:text-lg mb-4 mr-4">
              Subtotal ({productsNumber} items): <span className="font-semibold">{ES_CURRENCY.format(subtotal)}</span>
            </div>
            <button className="btn" onClick={onHandleCheckoutClick}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout