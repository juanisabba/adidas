import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
// import ProductsComponent from "../components/ProductsComponent";
import axios from "axios";
import RegisterText from "../components/RegisterText";
import ContentLoader from "react-content-loader"
import logo from "../images/logo.png";
import "../styles/product.css";
const ProductsComponent = lazy(() => import("../components/ProductsComponent"));

const Products = (props) => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);
  const page = location.pathname.slice(1);

  const fetchProducts = () => {
    axios
      .get(`https://data-adidas.herokuapp.com/api/products?category=${cat}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  if (!isLoading && !products.error) {
    if (sort === "popular") products.sort((a, b) => b.stars - a.stars);
    else if (sort === "newest") products.sort((a, b) => b.time - a.time);
    else if (sort === "asc") products.sort((a, b) => a.price - b.price);
    else if (sort === "desc") products.sort((a, b) => b.price - a.price);
  }

  const title = cat.includes("men-") && cat.split("-");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    setIsLoading(true)
    fetchProducts();
    setTimeout(()=>{
      setIsLoading(false);
    },300)
    scrollToTop();
    //eslint-disable-next-line
  }, [page]);

  return (
    <div className="products__page">
          {products.error ? (
            <div className="products__error">
              <div className="products__error-h1">
                <img src={logo} alt="" />
              <h1>NO PRODUCTS FOUND</h1>
              </div>
              <div className="products__error-div">
                <Link className="link link2" to="/products/men">Shop for men</Link>
                <Link className="link link2" to="/products/women">Shop for women</Link>
                <Link className="link link2" to="/products/kids">Shop for kids</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="products__page-container">
                <h1 className="products__page-title">
                  <i style={{ textTransform: "uppercase" }}>
                    {title ? `${title[0].concat("'s")} ${title[1]}` : cat.replace("-", " ")}
                  </i>
                </h1>
                <div className="products__filter">
                  <Select
                    className="products__sort"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="asc">Price (asc)</MenuItem>
                    <MenuItem value="desc">Price (desc)</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="products__list">
                {products &&
                  products.map((product) => (
                    <Suspense fallback={          <ContentLoader 
                      speed={2}
                      width={"100%"}
                      height={"50vw"}
                      backgroundColor="#d9d9d9"
                      foregroundColor="#ecebeb"
                      {...props}
                    >
                      <rect x="calc(4vw - 16px)" y="0" rx="0" ry="0" width="calc(23vw - 2px)" height="23vw" /> 
                      <rect x="calc(4vw - 3px)" y="25vw" rx="0" ry="0" width="17vw" height="1vw" /> 
                      <rect x="calc(4vw - 3px)" y="27vw" rx="0" ry="0" width="10vw" height="1vw" /> 
                      <rect x="calc(27vw - 12px)" y="0" rx="0" ry="0" width="calc(23vw - 2px)" height="23vw" /> 
                      <rect x="calc(27vw + 1px)" y="25vw" rx="0" ry="0" width="17vw" height="1vw" /> 
                      <rect x="calc(27vw + 1px)" y="27vw" rx="0" ry="0" width="10vw" height="1vw" /> 
                      <rect x="calc(50vw - 8px)" y="0" rx="0" ry="0" width="calc(23vw - 2px)" height="23vw" /> 
                      <rect x="calc(50vw + 5px)" y="25vw" rx="0" ry="0" width="17vw" height="1vw" /> 
                      <rect x="calc(50vw + 5px)" y="27vw" rx="0" ry="0" width="10vw" height="1vw" /> 
                      <rect x="calc(73vw - 4px)" y="0" rx="0" ry="0" width="calc(23vw - 2px)" height="23vw" /> 
                      <rect x="calc(73vw + 9px)" y="25vw" rx="0" ry="0" width="17vw" height="1vw" /> 
                      <rect x="calc(73vw + 9px)" y="27vw" rx="0" ry="0" width="10vw" height="1vw" /> 
                    </ContentLoader>
            }>
                    <ProductsComponent
                      id={product._id}
                      img1={product.img1}
                      img2={product.img2}
                      title={product.title}
                      price={product.price}
                      key={product._id}
                      stars={product.stars}
                    />
                </Suspense>
                  ))}
              </div>
            </>
          )}
          {!isLoading && <RegisterText />}
    </div>
  );
};

export default Products;
