import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header/Header'
import Contact from './components/Contact'
import Faqs from './components/Faqs'
import PrivacyPolicy from './components/Privacypolicy'
import NotFound from './components/NotFound'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import ProtectedRoute from './components/Profile/ProtectionRoute'
import GuestRoute from './components/Authentication/GuestRoute'
import OrderSuccess from './components/OrderSuccess'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import AdminPanel from './components/Admin/AdminPanel'
import AdminRoute from './components/Admin/AdminRoute'
import Products from './components/Products/Products'
import Magnets from './components/Products/Magnets'
import Cards from './components/Products/Cards'
import ProductDetail from './components/Products/ProductDetail'
import Profile from './components/Profile/Profile'
import About from './components/AboutSolution/About'
import Solution from './components/AboutSolution/Solution'

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
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
