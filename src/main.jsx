import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { CartProvider } from './context/CartContext.jsx'
import './utils/i18n.js'

createRoot(document.getElementById('root')).render(
   
   <BrowserRouter>
   <CartProvider>
    <App />
   </CartProvider>
   </BrowserRouter>
)
