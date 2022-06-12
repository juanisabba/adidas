import { ArrowRightAlt } from "@mui/icons-material";
import React from "react";
import {Link} from "react-router-dom"

const RegisterText = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {!user && (
        <div className="home__register-text">
          <h1>
            JOIN THE CLUB AND
            <br /> ENJOY A 10% OFF
          </h1>
          <Link to="/register" className="link">
          <button>
            REGISTER FREE
            <ArrowRightAlt fontSize="large" style={{ marginLeft: 10 }} />
          </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default RegisterText;
