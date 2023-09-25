import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Search = () => {
  return (
    <div className="w-[100%]">
        <div className=" flex items-center h-10 bg-amazoneClone-yellow rounded">
            <select className="p-2 bg-gray-300 text-black border text-xs xl:text-sm" name="" id="">
                <option value="All">All</option>
                <option value="Deals">Deals</option>
                <option value="Amazon">Amazon</option>
                <option value="Fashion">Fashion</option>
                <option value="Computers">Computers</option>
                <option value="Home">Home</option>
                <option value="Mobiles">Mobiles</option>
            </select>
            <input className=" flex grow items-center h-[100%] rounded-l text-black" type="text" />
            <button className="w-[45px]">
                <MagnifyingGlassIcon className="h-[25px] m-auto stroke-slate-900" />
            </button>
        </div>
    </div>
  )
}

export default Search