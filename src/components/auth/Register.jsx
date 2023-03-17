import React from "react";
import { toast } from "react-hot-toast";
import classes from "./AuthForm.module.scss";
import axios from "axios";

const Register = () => {
  const register = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await axios.post("/api/auth/register", user);
      toast.success("Register Successful");
    } catch (error) {
      console.log(error);
      toast.error("Register failed");
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Name
          <input type="text" name="name" placeholder="Fullname" required />
        </label>
        <label htmlFor="email">
          email
          <input type="email" name="email" placeholder="email" required />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            placeholder="enter password"
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
