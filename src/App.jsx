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
      </Routes>
      <Footer />
    </>
  )
}

export default App
