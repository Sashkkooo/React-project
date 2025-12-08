import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import Faqs from './components/Faqs'
import Footer from './components/footer'
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
import Checkout from './components/Checkout'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectionRoute'
import AdminRoute from './components/AdminRoute'
import AdminPanel from './components/AdminPanel'
import GuestRoute from './components/GuestRoute'

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
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
