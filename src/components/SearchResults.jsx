import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { callAPI } from '../utils/CallApi'

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);

  const getSearchResults = () => {
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("searchTerm");


    callAPI(`data/search.json`)
    .then((SearchResults) => {
      const categoryResults = SearchResults[category];

      if(searchTerm){
        const results = categoryResults.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        setProducts(results);
      }
      else
      {
        setProducts(categoryResults);
      }
    })
  };

  useEffect(() => {
    getSearchResults();
  }, [searchParams])

  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto">
      {
        products &&
        products.map((product, key) => {
          return (
            <div key={key}>
              {product.title}
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchResults