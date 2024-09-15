import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetailPage from "./components/ProductDetailPage";
import Search from "./components/Search";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';

import ThankYouPage from "./pages/ThankYou";
import Payment from "./pages/Payment";
import WishList from "./pages/WishList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/wishlist" element={<WishList/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
