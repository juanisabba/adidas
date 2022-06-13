import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/register.css";

const Register = ({setMessage}) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.USERS_URL;
      await axios.post(url, data);
      setMessage("You have created your account successfully")
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="register">
      {!user && (
        <>
          <form className="register__form" onSubmit={handleSubmit}>
            <h1 style={{ marginBottom: 10 }}>Create an account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
            />
                        <div className="register__form-password">
                        <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
            />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Visibility className="register__form-password-icon" />
                ) : (
                  <VisibilityOff className="register__form-password-icon" />
                )}
              </div>
            </div>
            {error && <div>{error}</div>}
            <button type="submit">Sing Up</button>
          </form>
          <div>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
