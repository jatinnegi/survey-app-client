import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/user";

const SignIn = () => {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (userId.trim() !== "") return <Redirect to="/" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.signIn(formData);
      dispatch(fetchUser(data));
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <div className="my-5">
      <h2>Sign In</h2>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control mt-1"
            id="email"
            name="email"
            placeholder="john@example.com"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mt-1"
            id="password"
            name="password"
            placeholder="Enter password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <Link to="/signup">Don't have an account?</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
