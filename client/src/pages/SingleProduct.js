import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import StarRatings from "react-star-ratings";
import RegisterText from "../components/RegisterText";
import { Pagination, Navigation } from "swiper";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import ContentLoader from "react-content-loader";
import moment from "moment";
import "../styles/singleProduct.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Comments from "../components/Comments";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = useSelector((state) => state.cart.products);
  const favorite = useSelector((state) => state.favorites.products);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [like, setLike] = useState(false);
  const [alert, setAlert] = useState(false);
  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [commentStars, setcommentStars] = useState(0);
  const [stars, setStars] = useState(0)
  const [message, setMessage] = useState("");

  const fetchProduct = () => {
    axios
      .get(`${process.env.PRODUCTS_URL}/find/${id}`)
      .then((res) => {
        setProduct(res.data);
        setStars(res.data.stars)
        setCommentsList(res.data.comments);
        setTotalRatings(res.data.totalRatings);
      })
      .catch((err) => console.log(err));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    fetchProduct();
    if (favorite.filter((product) => product.id === id).length === 1) {
      setLike(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    scrollToTop();
    //eslint-disable-next-line
  }, []);

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorite));
  const handleClick = (img, title, price) => {
    if (size) {
      const orderId = cart.length === 0 ? 1 : cart[cart.length - 1].orderId + 1;
      const newProduct = { id, img, title, quantity, price, size, orderId };
      dispatch(addProduct(newProduct));
      setSize("");
      setAlert(false);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2500);
    } else {
      setAlert(true);
      setAdded(false);
    }
  };

  const handleFavorite = (title, img1, img2, price, stars) => {
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

  const handleComment = async (e) => {
    e.preventDefault();
    const filteredList = commentsList.filter(
      (comment) => comment.user === user[0]._id
    );

    if (filteredList.length > 0) {
      setMessage("You have already commented and can't comment twice");
      setComment("");
      setcommentStars(0);
    } else if (commentStars === 0 || comment === "") {
      setMessage(
        comment === "" ? "Please insert a comment" : "Please rate the product"
      );
    } else if(!user){
      setMessage("You have to login to comment.")
    } else {
      await axios.put(`https://data-adidas.herokuapp.com/api/products/${id}`, {
        stars: (stars*totalRatings + commentStars) / (totalRatings + 1),
        totalRatings: totalRatings + 1,
        comments: [
          {
            user: user[0]._id,
            comment,
            commentStars,
            name: user[0].firstName,
            createdAt: moment().format("MMMM Do YYYY"),
          },
          ...commentsList,
        ],
      });
      setStars((stars*totalRatings + commentStars) / (totalRatings + 1))
      setTotalRatings(totalRatings + 1)
      setCommentsList([
        {
          user: user[0]._id,
          comment,
          commentStars,
          name: user[0].firstName,
          createdAt: moment().format("MMMM Do YYYY,"),
        },
        ...commentsList,
      ]);
      setComment("");
      setMessage("");
      commentStars(0);
    }
  };

  return (
    <div style={{ borderTop: "1px solid rgb(216, 194, 194)" }}>
      <>
        {isLoading ? (
          <ContentLoader
            speed={2}
            width={"100%"}
            height={"39vw"}
            backgroundColor="#d9d9d9"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="72%" y="3%" rx="3" ry="3" width="12%" height="5%" />
            <rect x="0" y="0" rx="0" ry="0" width="70%" height="100%" />
            <rect x="72%" y="13%" rx="3" ry="3" width="20%" height="5%" />
            <rect x="72%" y="19%" rx="3" ry="3" width="20%" height="5%" />
            <rect x="72%" y="27%" rx="3" ry="3" width="3%" height="3%" />
            <rect x="72%" y="38%" rx="3" ry="3" width="9%" height="3%" />
            <rect x="72%" y="43%" rx="3" ry="3" width="20%" height="8%" />
            <rect x="72%" y="57%" rx="3" ry="3" width="9%" height="3%" />
            <rect x="77%" y="62%" rx="3" ry="3" width="10%" height="8%" />
            <rect x="72%" y="78%" rx="3" ry="3" width="20%" height="8%" />
            <rect x="93%" y="78%" rx="3" ry="3" width="3%" height="8%" />
          </ContentLoader>
        ) : product.error ? (
          "error"
        ) : (
          <>
            <div className="single__product">
              <div className="single__product1">
                <div>
                  <Swiper
                    style={{ background: "#ebeff2" }}
                    className="myswiper"
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                  >
                    <SwiperSlide>
                      <div className="single__product-img">
                        <img src={product.img1} alt="" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="single__product-img">
                        <img src={product.img2} alt="" />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="single__product-description single__product-description-web">
                    <h1
                      style={{ textTransform: "uppercase", marginBottom: 20 }}
                    >
                      <i>{product.title}</i>
                    </h1>
                    <p>{product.desc}</p>
                  </div>
                  <div className="single__products-comments-web">
                  <Comments
                    handleComment={handleComment}
                    comment={comment}
                    setComment={setComment}
                    message={message}
                    commentsList={commentsList}
                    stars={commentStars}
                    setStars={setcommentStars}
                  />
                  </div>
                </div>
              </div>
              <div className="single__product-info">
                <StarRatings
                  rating={stars}
                  starDimension="20px"
                  starSpacing="5px"
                />
                <span
                  style={{ fontWeight: "bold", marginLeft: 10, fontSize: 16 }}
                >
                  {stars.toFixed(1)}
                </span>
                <p className="single__product-title">
                  <i>{product.title}</i>
                </p>
                <h3 style={{ fontWeight: 500 }}>${product.price}</h3>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    marginTop: 50,
                    marginBottom: 10,
                  }}
                >
                  Available sizes
                </p>
                <div className="single__product-size">
                  {product.size &&
                    product.size.map((talle) => (
                      <div
                        className={
                          size === talle
                            ? "single__product-single-size-active"
                            : "single__product-single-size"
                        }
                        onClick={() => setSize(talle)}
                        key={talle}
                      >
                        {talle}
                      </div>
                    ))}
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    marginTop: 50,
                    marginBottom: 10,
                  }}
                >
                  Choose the quantity
                </p>
                <div className="single__product-quantity">
                  <p
                    className="single__product-quantity-button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </p>
                  <div style={{ width: 50, textAlign: "center" }}>
                    {quantity}
                  </div>
                  <p
                    className="single__product-quantity-button"
                    onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  >
                    +
                  </p>
                </div>
                <div className="single__product-footer">
                  <button
                    className="single__product-pay-button"
                    onClick={() =>
                      handleClick(product.img1, product.title, product.price)
                    }
                  >
                    <i>ADD TO CART</i>
                  </button>
                  <div
                    className="single__product-like"
                    onClick={() =>
                      handleFavorite(
                        product.title,
                        product.img1,
                        product.img2,
                        product.price,
                        product.stars
                      )
                    }
                  >
                    {!like ? (
                      <FavoriteBorder style={{ fontSize: 28 }} />
                    ) : (
                      <Favorite
                        style={{ color: "rgb(197, 29, 29)", fontSize: 28 }}
                      />
                    )}
                  </div>
                </div>
                {alert && (
                  <p
                    className="single__product-alert"
                    style={{ color: "rgb(155, 0, 0)" }}
                  >
                    Please choose a size!
                  </p>
                )}
                {added && (
                  <p
                    className="single__product-alert"
                    style={{ color: "rgb(0, 82, 0)" }}
                  >
                    Product added to the cart!
                  </p>
                )}
              </div>
              <div className="single__product-description single__product-description-mobile">
                <h1 style={{ textTransform: "uppercase" }}>
                  <i>{product.title}</i>
                </h1>
                <p>{product.desc}</p>
              </div>
              <div>
                <div className="single__product-comments-mobile">
              <Comments
                    handleComment={handleComment}
                    comment={comment}
                    setComment={setComment}
                    message={message}
                    commentsList={commentsList}
                    stars={commentStars}
                    setStars={setcommentStars}
                  />
                </div>
              </div>
            </div>

            <RegisterText />
          </>
        )}
      </>
    </div>
  );
};

export default SingleProduct;
