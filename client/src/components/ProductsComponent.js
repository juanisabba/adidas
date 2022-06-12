import React, { useEffect, useState } from "react";
import "../styles/product.css";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";

const ProductsComponent = ({ id, img1, img2, title, price, stars }) => {

  const favorite = useSelector(state=>state.favorites.products)
  const dispatch = useDispatch()
  const [onHover, setOnHover] = useState("");
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (favorite.filter((product) => product.id === id).length === 1) {
      setLike(true);
    }
    //eslint-disable-next-line
  }, []);
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorite)
  );

  const handleFavorite = () => {
    const thisProduct = favorite.filter((product) => product.id === id);
    const filteredList = favorite.filter(
      (product) => product.id !== id
    );
    if (thisProduct.length >= 1) {
      dispatch(removeFavorite(filteredList))
      setLike(false)
    } else {
      dispatch(addFavorite({ id, title, img1, img2, price, stars }));
      setLike(true)
    }
  };

  return (
    <div className="product">
      <div className="product__like" onClick={handleFavorite}>
        {like ? (
          <Favorite style={{ color: "rgb(197, 29, 29)", fontSize: 28 }} />
        ) : (
          <FavoriteBorder style={{ fontSize: 28 }} />
        )}
      </div>
    <Link to={`/product/${id}`} className="link" key={id}>
      <img
        src={onHover !== id ? img1 : img2}
        alt={title}
        onMouseEnter={() => setOnHover(id)}
        onMouseLeave={() => setOnHover("")}
      />
      <p className="product__price">$ {price}</p>
      <h2 className="product__title">{title}</h2>
    </Link>
    </div>
  );
};

export default ProductsComponent;