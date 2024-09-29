import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetailPage from "./components/ProductDetailPage";
import Search from "./components/Search";
import Cart from "./pages/Cart";
import ThankYouPage from "./pages/ThankYou";
import Payment from "./pages/Payment";
import WishList from "./pages/WishList";
import ServicePage from "./pages/Service";
import Compare from "./pages/Compare";

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
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
