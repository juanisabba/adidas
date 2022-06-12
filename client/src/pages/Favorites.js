import React, { useEffect } from "react";
import ProductsComponent from "../components/ProductsComponent";
import "../styles/product.css";
import RegisterText from "../components/RegisterText";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.products);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="products__page">
      {favorites.length === 0 ? (
        <div className="products__error">
          <div className="products__error-h1">
            <img src={logo} alt="" />
            <h1 style={{textAlign: "center"}}>YOUR FAVORITES LIST IS EMPTY</h1>
          </div>
          <div className="products__error-div">
            <Link className="link link2" to="/products/men">
              Shop for men
            </Link>
            <Link className="link link2" to="/products/women">
              Shop for women
            </Link>
            <Link className="link link2" to="/products/kids">
              Shop for kids
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: "31px calc(4vw - 8px)", fontSize: 40 }}>
              <i>YOUR FAVORITES</i>
            </h1>
          </div>
          <div className="products__list">
            {favorites &&
              favorites.map((product) => (
                <ProductsComponent
                  id={product.id}
                  img1={product.img1}
                  img2={product.img2}
                  title={product.title}
                  price={product.price}
                  key={product.id}
                  stars={product.stars}
                />
              ))}
          </div>
        </>
      )}
      <RegisterText />
    </div>
  );
};

export default Favorites;
