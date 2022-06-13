import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "../styles/purchases.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Purchases = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  const fetcPurchases = async () => {
    await axios
      .get(`${process.env.USERS_URL}/${user[0]._id}`)
      .then((res) => setPurchases(res.data[0].purchases));
  };

  useEffect(() => {
    if (!user) navigate("/");
    fetcPurchases();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="purchases__page">
      {purchases.length === 0 ? (
        <div>
          <div className="products__error">
            <div className="products__error-h1">
              <img src={logo} alt="" />
              <h1 style={{textAlign: "center"}}>YOU DIDN'T BUY ANY PRODUCT YET</h1>
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
      ) : (
        <div className="purchases">
          <h1>My Purchases</h1>
          {purchases.map((purchase) => (
            <div key={purchase.id} className="purchases__items">
              <div className="purchases__items-info">
                <div style={{ fontWeight: 700 }}>Total: ${purchase.total}</div>
                <div>
                  {moment(purchase.createdAt).format("MMMM Do YYYY, HH:mm")}
                  hs
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchases;
