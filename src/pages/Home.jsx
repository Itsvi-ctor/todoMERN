import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/nav/Navbar";
import TaskList from "../components/task/TaskList";

const Home = () => {
  return (
    <Layout>
      <Navbar></Navbar>
      <TaskList></TaskList>
    </Layout>
  );
};

export default Home;
