import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'

import { callAPI } from '../utils/CallApi'

const Search = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  function resetValues(){
    setSearchTerm("");
    setCategory("All");
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();

    navigate({
      pathname: "search",
      search: `${
        createSearchParams({
          category: `${category}`,
          searchTerm: `${searchTerm}`
        })
      }`
    })
    
    resetValues();
  }

  const getSuggestions = () => {
    callAPI(`data/suggestions.json`)
    .then((suggestionResults) => {
      setSuggestions(suggestionResults)
    })
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="w-[100%]">
        <div className=" flex items-center h-10 bg-amazoneClone-yellow rounded">
            <select className="p-2 bg-gray-300 text-black border text-xs xl:text-sm" 
                    name="" 
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Deals">Deals</option>
                <option value="Amazon">Amazon</option>
                <option value="Fashion">Fashion</option>
                <option value="Computers">Computers</option>
                <option value="Home">Home</option>
                <option value="Mobiles">Mobiles</option>
            </select>
            <input className=" flex grow items-center h-[100%] rounded-l text-black" 
                  type="text" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="w-[45px]" onClick={onHandleSubmit}>
                <MagnifyingGlassIcon className="h-[25px] m-auto stroke-slate-900" />
            </button>
        </div>
        {
          suggestions &&
          <div className="bg-white text-black w-full z-40 absolute">
              {
                suggestions.filter((suggestion) => {
                  const currentSearchTerm = searchTerm.toLowerCase();
                  const title = suggestion.title.toLowerCase();
                  return (
                    currentSearchTerm &&
                    title.startsWith(currentSearchTerm) &&
                    title !== currentSearchTerm
                  )
                })
                .slice(0, 10)
                .map((suggestion) => (
                  <div key={suggestion.id} onClick={() => setSearchTerm(suggestion.title)}>
                    {suggestion.title}
                  </div>
                ))
              }
          </div>
        }
    </div>
  )
}

export default Search