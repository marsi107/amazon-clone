import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Search } from './'

const NavBar = () => {
    const cartNum = useSelector((state) => state.cart.productsNumber);
    
    const stateUserName = useSelector((state)=> state.userHandling.name.payload);
    const isUserLoggedIn = useSelector((state)=> state.userHandling.userLoggedIn.payload);
    let userName = isUserLoggedIn ? stateUserName : "sign in";

  return (
    <header className="min-w-[1000px]">
        <div className="flex bg-amazoneClone text-white h-[60px]">
            <div className="flex items-center m-4">
                <Link to={"/"}>
                    <img className="h-[35px] w-[100px] m-2" src="../images/amazon.png" alt="image of amazon logo" />
                </Link>                
                <div className="pr-4 pl-4">
                    <div className="text-xs xl:text-sm">Deliver to</div>
                    <div className="text-sm xl:text-base font-bold">Spain</div>
                </div>
            </div>
            <div className="flex grow relative items-center">
                <Search />
            </div>
            <div className="flex items-center m-4">
                <Link to={"/login"}>
                    <div className="pr-4 pl-4">
                        <div className="text-xs xl:text-sm">Hello, {userName}</div>
                        <div className="text-sm xl:text-base font-bold">Accounts & Lists</div>
                    </div>
                </Link>                
                <div className="pr-4 pl-4">
                    <div className="text-xs xl:text-sm">Returns</div>
                    <div className="text-sm xl:text-base font-bold">& Orders</div>
                </div>
                <Link to={"/checkout"}>
                    <div className="flex pr-3 pl-3">
                        <ShoppingCartIcon className="h-[48px]" />
                        <div className="relative">
                            <div className="absolute right-[9px] font-bold m-2 text-orange-400">
                                {cartNum}
                            </div>
                        </div>
                        <div className="mt-7 text-xs xl:text-sm font-bold">
                            Cart
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className="flex bg-amazoneClone-light_blue text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
            <div>Today's Deals</div>
            <div>Customer Service</div>
            <div>Registry</div>
            <div>Gift Cards</div>
            <div>Sells</div>
        </div>
    </header>
  )
}

export default NavBar