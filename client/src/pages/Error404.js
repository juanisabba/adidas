import React from "react";
import { Link } from "react-router-dom";
import RegisterText from "../components/RegisterText";
import logo from "../images/logo.png";
import "../styles/cart.css";

const Error404 = () => {
  return (
    <>
      <div className="cart">
        <div className="products__error">
          <div className="products__error-h1">
            <img src={logo} alt="" />
            <h1>This page doesn't exist</h1>
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
      </div>
      <RegisterText />
    </>
  );
};

export default Error404;
