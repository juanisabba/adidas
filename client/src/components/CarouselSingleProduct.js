import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";

const CarouselSingleProduct = ({ id, img1, img2, title, price, stars, sort }) => {
  const favorite = useSelector((state) => state.favorites.products);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (favorite.filter((product) => product.id === id).length === 1) {
      setLike(true);
    }else(setLike(false))
    //eslint-disable-next-line
  }, [favorite.length]);
  localStorage.setItem("favorites", JSON.stringify(favorite));

  const handleFavorite = () => {
    const thisProduct = favorite.filter((product) => product.id === id);
    const filteredList = favorite.filter((product) => product.id !== id);
    if (thisProduct.length >= 1) {
      dispatch(removeFavorite(filteredList));
      setLike(false);
    } else {
      dispatch(addFavorite({ id, title, img1, img2, price, stars }));
      setLike(true);
    }
  };

  return (
    <div className="carousel__product-container">
      <div className="carousel__product-like" onClick={handleFavorite}>
        {like ? (
          <Favorite style={{ color: "rgb(197, 29, 29)" }} />
        ) : (
          <FavoriteBorder />
        )}
      </div>
      <Link to={`/product/${id}`} className="link">
        <div className="product__info">
          <img src={img1} alt={title} />
          <p className="product__price">$ {price}</p>
          <p className="product__title-carousel">{title}</p>
        </div>
        {sort === "new" ? (
          <p className="product__new">New</p>
        ) : (
          <div className="product__stars">
            <StarRatings
              rating={stars}
              starDimension="15px"
              starSpacing="3px"
            />
          </div>
        )}
      </Link>
    </div>
  );
};

export default CarouselSingleProduct;
