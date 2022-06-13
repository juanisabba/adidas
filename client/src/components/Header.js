import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import {
  Close,
  Favorite,
  FavoriteBorder,
  PersonOutline,
  Search,
  ShoppingCartOutlined,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/header.css";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const favoritesQuantity = useSelector((state) => state.favorites.quantity);
  const location = useLocation();
  const page = location.pathname.slice(1);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = () => {
    axios
      .get(`${process.env.PRODUCTS_URL}?submenu=${search}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    setSubMenuOpen(false);
    setSearch("");
    setMobileSubMenu("");
    setOpenSearch(false);
    setOpenUserMenu(false)
    //eslint-disable-next-line
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search/${search.trim()}`);
      setSearch("");
    }
  };

  const handleClick = () => {
    setMobileMenu(false);
  };

  const handleSearch = () => {
    setOpenSearch(!openSearch);
    setMobileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="header header-web">
        <div className="header__logo">
          <Link className="link" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__ul">
          <div className="header__div">
            <Link className="link" to="/products/men">
              MEN
            </Link>
            <ul className="header__submenu">
              <Link
                className="link header__submenu-category"
                to="/products/men"
              >
                All products
              </Link>
              <Link
                className="link header__submenu-category"
                to="/products/men-shoes"
              >
                Shoes
              </Link>
              <ul>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/men-shorts"
                  >
                    Shorts
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/men-pants"
                  >
                    Pants
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/men-tshirts"
                  >
                    Tshirts
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/men-jerseys"
                  >
                    Jerseys
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/men-hoodies"
                  >
                    Hoodies
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
          <div className="header__div">
            <Link className="link" to="/products/women">
              WOMEN
            </Link>
            <ul className="header__submenu">
              <Link
                className="link header__submenu-category"
                to="/products/women"
              >
                All products
              </Link>
              <Link
                className="link header__submenu-category"
                to="/products/women-shoes"
              >
                Shoes
              </Link>
              <ul>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/women-shorts"
                  >
                    Shorts
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/women-pants"
                  >
                    Pants
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/women-tshirts"
                  >
                    Tshirts
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/women-jerseys"
                  >
                    Jerseys
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="products/women-hoodies"
                  >
                    Hoodies
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
          <div className="header__div">
            <Link className="link" to="/products/kids">
              KIDS
            </Link>
            <ul className="header__submenu">
              <Link
                className="link header__submenu-category"
                to="/products/kids"
              >
                All products
              </Link>
              <Link
                className="link header__submenu-category"
                to="/products/kids-shoes"
              >
                Shoes
              </Link>
              <ul>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="/products/kids-shorts"
                  >
                    Shorts
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="/products/kids-pants"
                  >
                    Pants
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="/products/kids-tshirts"
                  >
                    Tshirts
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="/products/kids-jerseys"
                  >
                    Jerseys
                  </Link>
                </li>
                <li className="header__submenu-category">
                  <Link
                    className="link header__submenu-category"
                    to="/products/kids-hoodies"
                  >
                    Hoodies
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="header__right">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <form
              method="GET"
              className="header__search-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="header__search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onClick={() => setSubMenuOpen(true)}
              />
              <div className="header__search-icon">
                {search.length > 0 ? (
                  <Close onClick={() => setSearch("")} />
                ) : (
                  <Search />
                )}
              </div>
            </form>
            {products.error === 404 ? (
              subMenuOpen &&
              search.length > 0 && (
                <div className="header__search-submenu-error">
                  No products found
                </div>
              )
            ) : (
              <div className="header__search-submenu">
                {subMenuOpen &&
                  search.length > 0 &&
                  products &&
                  products.map((product, index) => (
                    <Link
                      key={index}
                      to={`/product/${product._id}`}
                      className="header__search-submenu-product link"
                    >
                      <img src={product.img1} alt="" />
                      <div style={{ padding: "10px 0 0 10px" }}>
                        <h3>
                          {product.title.length < 19
                            ? product.title
                            : `${product.title.substr(0, 18)}...`}
                        </h3>
                        <p>${product.price}</p>
                      </div>
                    </Link>
                  ))}
                {subMenuOpen && search.length > 0 && products && (
                  <Link className="link" to={`/search/${search}`}>
                    <div className="header__search-view-all">View All</div>
                  </Link>
                )}
              </div>
            )}
          </div>
          {user ? (
            <div className="header__user-father">
              <div
                className="header__user"
                style={{ textTransform: "uppercase" }}
              >{`${user[0].firstName[0]}${user[0].lastName[0]}`}</div>
              <div className="header__user-submenu-child">
                <div className="header__user-submenu">
                  <Link to="/purchases" className="link">
                    <li style={{ borderBottom: "1px solid gray" }}>
                      My purchases
                    </li>
                  </Link>
                  <li onClick={handleLogout}>Logout</li>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/register" className="link">
              <PersonOutline className="header__icon" />
            </Link>
          )}

          <Link to="/favorites" className="link">
            <Badge
              badgeContent={favoritesQuantity}
              color="primary"
              className="header__icon"
            >
              {page === "favorites" ? <Favorite /> : <FavoriteBorder />}
            </Badge>
          </Link>
          <Link className="link" to="/cart">
            <Badge
              badgeContent={cartQuantity}
              color="primary"
              className="header__icon"
            >
              <ShoppingCartOutlined />
            </Badge>
          </Link>
        </div>
      </div>
      <div className="header header-mobile">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar style={{ backgroundColor: "#fff", height: 70 }}>
              <div className="header__mobile-left">
                <IconButton
                  style={{ color: "#000" }}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setMobileMenu(!mobileMenu)}
                >
                  <MenuIcon />
                </IconButton>
                <Link to="/favorites" className="link">
                  <Badge badgeContent={favoritesQuantity} color="primary">
                    {page === "favorites" ? <Favorite /> : <FavoriteBorder />}
                  </Badge>
                </Link>
              </div>
              <div className="header__mobile-logo">
                <Link className="link" to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="header__mobile-right">
                <Search
                  style={{ color: "#000", cursor: "pointer" }}
                  onClick={handleSearch}
                />
                {user ? (
                  <div className="header__user-father">
                    <div
                      className="header__user"
                      style={{ textTransform: "uppercase" }}
                      onClick={()=>setOpenUserMenu(true)}
                    >{`${user[0].firstName[0]}${user[0].lastName[0]}`}</div>
                    {openUserMenu && (
                      <div className="header__user-submenu-child">
                        <div className="header__user-submenu">
                          <Link to="/purchases" className="link">
                            <li style={{ borderBottom: "1px solid gray" }}>
                              My purchases
                            </li>
                          </Link>
                          <li onClick={handleLogout}>Logout</li>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/register" className="link">
                    <PersonOutline className="header__icon" />
                  </Link>
                )}
                <Link className="link" to="/cart">
                  <Badge
                    badgeContent={cartQuantity}
                    color="primary"
                    className="header__icon"
                  >
                    <ShoppingCartOutlined />
                  </Badge>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        {mobileMenu && (
          <div className="header__submenu-mobile">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 15px",
              }}
            >
              <Close
                style={{ fontSize: 32, cursor: "pointer" }}
                onClick={() => setMobileMenu(false)}
              />
            </div>
            <ul>
              <div
                className="header__submenu-mobil-category"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() =>
                  setMobileSubMenu(mobileSubMenu === "men" ? "" : "men")
                }
              >
                <h1>MEN</h1>
                {mobileSubMenu === "men" ? (
                  <KeyboardArrowDown />
                ) : (
                  <KeyboardArrowUp />
                )}
              </div>
              {mobileSubMenu === "men" && (
                <div className="header__submenu-mobile-list">
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="/products/men"
                      >
                        All products
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="/products/men-shoes"
                      >
                        Shoes
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/men-shorts"
                      >
                        Shorts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/men-pants"
                      >
                        Pants
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/men-tshirts"
                      >
                        Tshirts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/men-jerseys"
                      >
                        Jerseys
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/men-hoodies"
                      >
                        Hoodies
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <div
                className="header__submenu-mobil-category"
                onClick={() =>
                  setMobileSubMenu(mobileSubMenu === "women" ? "" : "women")
                }
              >
                <h1>WOMEN</h1>
                {mobileSubMenu === "women" ? (
                  <KeyboardArrowDown />
                ) : (
                  <KeyboardArrowUp />
                )}
              </div>
              {mobileSubMenu === "women" && (
                <div className="header__submenu-mobile-list">
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="/products/women"
                      >
                        All products
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="/products/women-shoes"
                      >
                        Shoes
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/women-shorts"
                      >
                        Shorts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/women-pants"
                      >
                        Pants
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/women-tshirts"
                      >
                        Tshirts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/women-jerseys"
                      >
                        Jerseys
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/women-hoodies"
                      >
                        Hoodies
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <div
                className="header__submenu-mobil-category"
                onClick={() =>
                  setMobileSubMenu(mobileSubMenu === "kids" ? "" : "kids")
                }
              >
                <h1>KIDS</h1>
                {mobileSubMenu === "kids" ? (
                  <KeyboardArrowDown />
                ) : (
                  <KeyboardArrowUp />
                )}
              </div>
              {mobileSubMenu === "kids" && (
                <div className="header__submenu-mobile-list">
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="/products/kids"
                      >
                        All products
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="/products/kids-shoes"
                      >
                        Shoes
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/kids-shorts"
                      >
                        Shorts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/kids-pants"
                      >
                        Pants
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/kids-tshirts"
                      >
                        Tshirts
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/kids-jerseys"
                      >
                        Jerseys
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleClick}
                        className="link"
                        to="products/kids-hoodies"
                      >
                        Hoodies
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
      {openSearch && (
        <div className="header__mobile-search">
          <form
            method="GET"
            className="header__mobile-search-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="header__mobile-search-input"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onClick={() => setSubMenuOpen(true)}
            />
            <div className="header__mobile-search-icon">
              {search.length > 0 ? (
                <Close onClick={() => setSearch("")} />
              ) : (
                <Search />
              )}
            </div>
          </form>
          {products.error === 404 ? (
            subMenuOpen &&
            search.length > 0 && (
              <div className="header__mobile-search-submenu-error">
                No products found
              </div>
            )
          ) : (
            <div className="header__mobile-search-submenu">
              {subMenuOpen &&
                search.length > 0 &&
                products &&
                products.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/${product._id}`}
                    className="header__mobile-search-submenu-product link"
                  >
                    <img src={product.img1} alt="" />
                    <div style={{ padding: "10px 0 0 10px" }}>
                      <h3>
                        {product.title.length < 49
                          ? product.title
                          : `${product.title.substr(0, 48)}...`}
                      </h3>
                      <p>${product.price}</p>
                    </div>
                  </Link>
                ))}
              {subMenuOpen && search.length > 0 && products && (
                <Link className="link" to={`/search/${search}`}>
                  <div className="header__search-view-all">View All</div>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
