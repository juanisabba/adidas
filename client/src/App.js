import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import ProductsList from "./pages/ProductsList";
import Favorites from "./pages/Favorites";
import SearchPage from "./pages/SearchPage";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import Error404 from "./pages/Error404";

const App = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:id" element={<ProductsList />} />
          <Route exact path="/product/:id" element={<SingleProduct />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/search/:id" element={<SearchPage />} />
          <Route exact path="/pay" element={<Payment />} />
          <Route
            exact
            path="/register"
            element={<Register setMessage={setMessage} />}
          />
          <Route exact path="/login" element={<Login message={message} />} />
          <Route exact path="/purchases" element={<Purchases />} />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
};

export default App;
