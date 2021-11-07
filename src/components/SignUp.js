import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../api";
import { fetchUser } from "../redux/user";

const SignUp = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
    userType: "respondant",
  });

  if (userId.trim() !== "") return <Redirect to="/" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.signUp(formData);
      dispatch(fetchUser(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="my-5">
      <h2>Sign Up</h2>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            className="form-control mt-1"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control mt-1"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mt-1"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control mt-1"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control mt-1"
            id="age"
            name="age"
            placeholder="Enter age"
            autoComplete="off"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="userType">User Type</label>
          <select
            className="form-control mt-1"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="respondant">Respondant</option>
            <option value="coordinator">Coordinator</option>
          </select>
        </div>
        <div className="mb-4">
          <Link to="/signin">Already have an account?</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
