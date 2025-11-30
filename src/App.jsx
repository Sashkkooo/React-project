import { Route, Routes } from 'react-router'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Faqs from './components/Faqs'
import Footer from './components/footer'
import Header from './components/header'
import Home from './components/Home'
import PrivacyPolicy from './components/Privacypolicy'
import Solution from './components/Solution'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Products from './components/Products'
import Magnets from './components/Magnets'
import Cards from './components/Cards'
import ProductDetail from './components/ProductDetail'
import Example from './components/Example'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faqs' element={<Faqs />} />
        <Route path='/solution' element={<Solution />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/' element={<Products />} />
        <Route path='/products/magnets' element={<Magnets />} />
        <Route path='/products/cards' element={<Cards />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/example" element={<Example />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
