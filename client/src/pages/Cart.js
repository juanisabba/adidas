import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../redux/cartSlice";
import { Close } from "@mui/icons-material";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import RegisterText from "../components/RegisterText";
import logo from "../images/logo.png";
import { Box, Modal } from "@mui/material";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(true);

  localStorage.setItem("cart", JSON.stringify(products));

  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }

  const removeItem = (orderId) => {
    const filteredList = products.filter(
      (product) => product.orderId !== orderId
    );
    dispatch(removeProduct(filteredList));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="cart">
      {!user && products.length > 0 && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="payment__success">
            <div>
              <h1 style={{ fontSize: 26, marginBottom: 20 }}>
                Do you want a 10% off in all your purchases?
              </h1>
            </div>
            <div style={{ fontSize: 18 }}>
              <Link style={{ marginRight: 5 }} to="/login">
                Login
              </Link>
              or{" "}
              <Link style={{ marginLeft: 5 }} to="/register">
                Sign up
              </Link>
            </div>
          </Box>
        </Modal>
      )}
      {products.length === 0 ? (
        <div>
          <div className="products__error">
            <div className="products__error-h1">
              <img src={logo} alt="" />
              <h1>YOUR CART IS EMPTY</h1>
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
          <RegisterText />
        </div>
      ) : (
        <>
          <div className="cart__products">
            {products &&
              products.map((product, index) => (
                <div className="cart__single-product" key={index}>
                  <div
                    className="cart__remove-icon"
                    onClick={() => removeItem(product.orderId)}
                  >
                    <Close />
                  </div>
                  <img src={product.img} alt="" />
                  <div style={{ padding: 20 }}>
                    <Link className="link" to={`/product/${product.id}`}>
                      <h1 className="cart__single-product-title cart__single-product-title-web">
                        {product.title}
                      </h1>
                      <h1 className="cart__single-product-title cart__single-product-title-tablet">
                        {product.title.length < 30
                          ? product.title
                          : `${product.title.substr(0, 29)}...`}
                      </h1>
                      <h1 className="cart__single-product-title cart__single-product-title-mobile">
                        {product.title.length < 18
                          ? product.title
                          : `${product.title.substr(0, 17)}...`}
                      </h1>
                    </Link>
                    <h3 className="cart__single-product-info">
                      Quantity:{" "}
                      <b style={{ fontWeight: 500 }}>{product.quantity}</b>
                    </h3>
                    <h3 className="cart__single-product-info">
                      Total:{" "}
                      <b style={{ fontWeight: 500 }}>
                        ${product.price * product.quantity}
                      </b>
                    </h3>
                    <h3 className="cart__single-product-info">
                      Size:{" "}
                      <b
                        style={{ fontWeight: 500, textTransform: "uppercase" }}
                      >
                        {product.size}
                      </b>
                    </h3>
                  </div>
                </div>
              ))}
          </div>
          <div className="cart__resume">
            <h1 style={{ marginBottom: 10 }}>Resume</h1>
            {products &&
              products.map((product, index) => (
                <div key={index} className="cart__resume-product">
                  <p>
                    {product.quantity} {product.title}
                  </p>
                  <p style={{ marginLeft: 50, textAlign: "start" }}>
                    ${product.price * product.quantity}
                  </p>
                </div>
              ))}
            {user && (
              <div className="cart__resume-product">
                <p>Member discount</p>
                <p style={{ marginLeft: 50, textAlign: "start" }}>
                  - ${(total / 10).toFixed(2)}
                </p>
              </div>
            )}

            <div className="cart__total">
              <h2>TOTAL</h2>
              <h2>${user ? (total * 0.9).toFixed(2) : total}</h2>
            </div>
            <Link to="/pay" className="link">
              <div className="cart__pay-button">PAY</div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
