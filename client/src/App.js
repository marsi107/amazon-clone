import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, NavBar, Checkout, ProductPage, SearchResults, LoginPage, RegisterPage } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route  path="/checkout" element={<Checkout />}/>
          <Route  path="/product/:id" element={<ProductPage />}/>
          <Route  path="/search" element={<SearchResults />}/>
          <Route  path="/login" element={<LoginPage />}/>
          <Route  path="/register" element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App