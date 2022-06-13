import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/productsCarousel.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CarouselSingleProduct from "./CarouselSingleProduct";
import { useSelector } from "react-redux";
import { Autoplay, Navigation } from "swiper";

const CarouselProducts = ({ sort }) => {
  const [products, setProducts] = useState([]);
  const favorites = useSelector((state) => state.favorites.products);

  const fetchProducts = () => {
    axios
      .get(`${process.env.PRODUCTS_URL}?${sort}=true`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="carousel__page">
      <h1 className="carousel__page-title">
        <i>
          {sort === "likes"
            ? "LIKED PRODUCTS"
            : sort === "new"
            ? "LATEST PRODUCTS"
            : sort === "popular"
            ? "MOST POPULAR"
            : ""}
        </i>
      </h1>
      {sort === "likes" && (
        <Swiper
          className="myswiper"
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            800: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 5,
            },
            1400: {
              slidesPerView: 6,
            },
          }}        
                
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {favorites &&
            favorites.map((product, index) => (
              <SwiperSlide className="carousel__product" key={index}>
              <CarouselSingleProduct
                id={product.id}
                img1={product.img1}
                img2={product.img2}
                title={product.title}
                price={product.price}
                stars={product.stars}
                sort={sort}
              />
            </SwiperSlide>
            )
            )}
        </Swiper>
      )}
      {sort !== "likes" && (
        <Swiper
          className="myswiper"
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            800: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 5,
            },
            1400: {
              slidesPerView: 6,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {products &&
            products.map((product, index) => (
              <SwiperSlide className="carousel__product" key={index}>
                <CarouselSingleProduct
                  id={product._id}
                  img1={product.img1}
                  img2={product.img2}
                  title={product.title}
                  price={product.price}
                  stars={product.stars}
                  sort={sort}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default CarouselProducts;
