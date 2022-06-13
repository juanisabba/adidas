import React, { useState, useMemo, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import "../styles/payment.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import successImg from "../images/successImg.png";
import { Box, Modal } from "@mui/material";

const CheckoutForm = () => {
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000",
        fontWeight: 400,
        fontSize: "17px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#000",
        },
        "::placeholder": {
          color: "rgba(0,0,0,0.7)",
        },
      },
      invalid: {
        iconColor: "red",
        color: "red",
      },
    },
  };
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    name: user ? `${user[0].firstName} ${user[0].lastName}` : "",
    email: user ? `${user[0].email}` : "",
    country: "",
    city: "",
    adress: "",
  });
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const location = useLocation();
  const page = location.pathname.slice(1);
  const [open, setOpen] = useState(true);
  

  const cart = useSelector((state) => state.cart.products);
  const [userPurchases, setUserPurchases] = useState([]);

  const fetchProducts = async () => {
    axios
      .get(`${process.env.USERS_URL}/${user[0]._id}`)
      .then((res) => setUserPurchases(res.data[0].purchases));
  };

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSuccess(false);
  }, [page]);

  const changeHandler = (value) => {
    setValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const purchaseId =
          userPurchases.length === 0 ? 1 : userPurchases[0].id + 1;
        await axios.put(`${process.env.USERS_URL}/${user[0]._id}`, {
          purchases: [
            {
              id: purchaseId,
              name: data.name,
              email: data.email,
              country: value,
              city: data.city,
              adress: data.adress,
              products: cart,
              total: (total * 0.9).toFixed(2),
              createdAt: new Date(),
            },
            ...userPurchases,
          ],
        });
      } catch (error) {}

      try {
        await axios.post(process.env.CHECKOUT, {
          id,
          amount: user ? (total * 90).toFixed(2) : total * 100, //cents
        });
        elements.getElement(CardElement).clear();
        setMessage("");
        setData({ name: "", email: "", country: "", city: "", adress: "" });
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    dispatch(clearCart([]));
    localStorage.removeItem("cart");
    navigate("/");
    setSuccess(false);
  };

  return (
    <div>
      {total === 0 ? (
        navigate("/")
      ) : success ? (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="payment__success">
            <div className="payment__success-info">
              <img src={successImg} alt="" />
              <h1 className="payment__success-info-title">SUCCESSFUL PURCHASE</h1>
            </div>
            <div>
              You can view all your purchases <Link style={{marginLeft: 5}} onClick={handleCloseModal} to="/purchases">here</Link>
            </div>
            <div style={{marginTop: 20}}>
              Please comment and rate the products that you have bought
            </div>
          </Box>
        </Modal>
      ) : (
        <>
          <form className="payment__form" onSubmit={handleSubmit}>
            <div className="payment__form-info">
              <h1 className="payment__h1">
                Total: ${user ? (total * 0.9).toFixed(2) : total}
              </h1>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
              <Select
                options={options}
                className="payment__select-country"
                required
                placeholder="Select Country"
                value={value}
                onChange={changeHandler}
              />
              <div className="payment__adress">
                <input
                  type="text"
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Adress"
                  value={data.adress}
                  onChange={(e) => setData({ ...data, adress: e.target.value })}
                  required
                />
              </div>
              <div className="payment__form-card">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </div>
            <button
              disabled={loading}
              className={
                loading ? "payment__button button__disabled" : "payment__button"
              }
            >
              {loading ? (
                <div>
                  <span>Loading...</span>
                </div>
              ) : (
                "PAY"
              )}
            </button>
          </form>
          {message && (
            <div style={{ width: "50vw" }}>
              {message === "Your card number is invalid."
                ? `${message} Try: 4242 4242 4242 4242`
                : message}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
