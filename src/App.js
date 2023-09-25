import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, NavBar, Checkout, ProductPage, SearchResults } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route  path="/checkout" element={<Checkout />}/>
          <Route  path="/product/:id" element={<ProductPage />}/>
          <Route  path="/search" element={<SearchResults />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App