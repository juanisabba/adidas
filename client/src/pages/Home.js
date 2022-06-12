import React, { useEffect, useState, Suspense, lazy } from "react";
import { Close, ArrowRightAlt } from "@mui/icons-material";
import portadaHome from "../images/portada-home.jpg";
import "../styles/home.css";
import { Link } from "react-router-dom";
// import CarouselProducts from "../components/CarouselProducts";
import logoRiver from "../images/river-plate-logo.webp";
import logoAfa from "../images/afa-logo.webp";
import logoRealMadrid from "../images/real-madrid-logo.webp";
import logoBayernMunchen from "../images/bayern-munchen-logo.webp";
import logoJuventus from "../images/juventus-logo.webp";
import RegisterText from "../components/RegisterText";
import { useSelector } from "react-redux";
const CarouselProducts = lazy(() => import("../components/CarouselProducts"));

const Home = () => {
  const [closePromotion, setClosePromotion] = useState(false);
  const favorite = useSelector((state) => state.favorites.products);
  const user = JSON.parse(localStorage.getItem("user"));


  const scrollToTop = () => {
    window.scrollTo({
      top: 0, 
    });      
  }

  useEffect(()=>{
    scrollToTop()
  },[])
  
  return (
    <div className="home">
      {!closePromotion && !user && (
        <div className="home__promotional-text">
          <span>
            Subscribe and enjoy a 10% off.{" "}
            <Link to="/register" style={{ color: "#fff" }}>
              Join us
            </Link>
          </span>
          <div style={{ position: "absolute", right: "2.3%" }}>
            <Close
              style={{ cursor: "pointer" }}
              onClick={() => setClosePromotion(true)}
            />
          </div>
        </div>
      )}
      <>
        <div className="home__portada-opacity"></div>
        <img src={portadaHome} className="home__portada" alt="" />
        <Link to="/products/shoes" className="link">
          <button className="home__portada-button">
            BUY SHOES{" "}
            <ArrowRightAlt fontSize="large" style={{ marginLeft: 10 }} />
          </button>
        </Link>
      </>
      {favorite.length > 0 && <div style={{ display: "flex" }}>
        <Suspense fallback={<h1>loading</h1>}>
        <CarouselProducts sort="likes" />
        </Suspense>
      </div>}
      
      <Suspense fallback={<h1>loading</h1>}>
      <div style={{ display: "flex" }}>
        <CarouselProducts sort="new" />
      </div>
        </Suspense>

      <div className="home__clubs">
        <h1>FIND YOUR FAVORITE TEAM</h1>
        <div>
          <Link to="/products/argentina">
            <img src={logoAfa} alt="" />
          </Link>
          <Link to="/products/river-plate">
            <img src={logoRiver} alt="" />
          </Link>
          <Link to="/products/real-madrid">
            <img src={logoRealMadrid} alt="" />
          </Link>
          <Link to="/products/bayern-munchen">
            <img src={logoBayernMunchen} alt="" />
          </Link>
          <Link to="/products/juventus">
            <img src={logoJuventus} alt="" />
          </Link>
        </div>
      </div>
      <div style={{ display: "flex" }}>
      <Suspense fallback={<h1>loading</h1>}>
        <CarouselProducts sort="popular" />
        </Suspense>
      </div>
      <div className="home__history-text">
        <div>
          <h3>STORIES, STYLE, AND SPORTING GOODS AT ADIDAS, SINCE 1949</h3>
          <br />
          <p>
            Through sports, we have the power to change lives. Sports keep us
            fit. They keep us mindful. They bring us together. Athletes inspire
            us. They help us to get up and get moving. And sporting goods
            featuring the latest technologies help us beat our personal best.
            adidas is home to the runner, the basketball player, the soccer kid,
            the fitness enthusiast, the yogi. And even the weekend hiker looking
            to escape the city. The 3-Stripes are everywhere and anywhere. In
            sports. In music. On life’s stages. Before the whistle blows, during
            the race, and at the finish line. We’re here to support creators. To
            improve their game. To live their lives. And to change the world.
            mundo.
            <br />
            <br />
            adidas is about more than sportswear and workout clothes. We partner
            with the best in the industry to co-create. This way we offer our
            fans the sporting goods, style and clothing that match the athletic
            needs, while keeping sustainability in mind. We’re here to support
            creators. Improve their game. Create change. And we think about the
            impact we have on our world.
          </p>
        </div>
        <div>
          <h3>WORKOUT CLOTHES, FOR ANY SPORT</h3>
          <br />
          <p>
            adidas designs for athletes of all kinds. Creators who love to
            change the game. People who challenge conventions, break the rules,
            and define new ones. Then break them all over again. We design
            sports apparel that gets you moving, winning, and living life to the
            fullest. We create bras and tights for female athletes who play just
            as hard as the men. From low to high support. Maximum comfort. We
            design, innovate and iterate. We test new technologies in action. On
            the field, the track, the court, and in the pool. We’re inspired by
            retro workout clothes, creating new streetwear essentials. From NMD
            and Ozweego to our Firebird tracksuits. From Stan Smith to
            Superstar. Classic sports models are brought back to life on the
            streets and the stages around the world.
            <br />
            <br />
            Through our collections we blur the borders between high fashion and
            high performance. Like our adidas by Stella McCartney athletic
            clothing collection – designed to look the part inside and outside
            of the gym. Or some of our adidas Originals lifestyle pieces, that
            can be worn as sports apparel too. Our lives are constantly
            changing. Becoming more and more versatile. And adidas designs with
            that in mind.
          </p>
        </div>
      </div>
      <RegisterText />
    </div>
  );
};

export default Home;
