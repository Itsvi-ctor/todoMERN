import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.scss";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";

const navbar = () => {
  const [user, setuser] = useState(null);
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setuser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setuser(null);
      toast.success("Loggout successful");
      navigate("/auth")
    } catch (error) {
      toast.error("Loggout Failed");
      console.log(error);
    }
  };

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon}></FaUserAlt>
        <div>
          <h1 className={classes.name}>{user.name}</h1>
          <h1 className={classes.email}>{user.email}</h1>
          <Link to="/edit-profile" className={classes.editBtn}>
            Edit
          </Link>
        </div>
      </div>
      <nav>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default navbar;
