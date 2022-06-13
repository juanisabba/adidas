import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/register.css";

const Login = ({message}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const url = process.env.AUTH_URL;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
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
        {!message && message}
          <form className="register__form" onSubmit={handleSubmit}>
            <h1 style={{ marginBottom: 10 }}>Login</h1>
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
            <button type="submit">Sing In</button>
          </form>
          <div>
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
