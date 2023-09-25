import { ShoppingCartIcon } from '@heroicons/react/24/outline'

import { Search } from './'

const NavBar = () => {
  return (
    <header className="min-w-[1000px]">
        <div className="flex bg-amazoneClone text-white h-[60px]">
            <div className="flex items-center m-4">
                <img className="h-[35px] w-[100px] m-2" src="../images/amazon.png" alt="image of amazon logo" />
                <div className="pr-4 pl-4">
                    <div className="text-xs xl:text-sm">Deliver to</div>
                    <div className="text-sm xl:text-base font-bold">Spain</div>
                </div>
            </div>
            <div className="flex grow relative items-center">
                <Search />
            </div>
            <div className="flex items-center m-4">
                <div className="pr-4 pl-4">
                    <div className="text-xs xl:text-sm">Hello, sign in</div>
                    <div className="text-sm xl:text-base font-bold">Accounts & Lists</div>
                </div>
                <div className="pr-4 pl-4">
                    <div className="text-xs xl:text-sm">Returns</div>
                    <div className="text-sm xl:text-base font-bold">& Orders</div>
                </div>
                <div className="flex pr-3 pl-3">
                    <ShoppingCartIcon className="h-[45px]" />
                    <div className="mt-7 text-xs xl:text-sm font-bold">
                        Cart
                    </div>
                </div>
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