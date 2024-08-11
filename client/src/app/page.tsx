"use client";
// pages/index.js
import HomePage from "@/app/pages/home";
import { withAuth } from "./components/withAuth";
import Layout from "./layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <HomePage />  
    </Layout>
  );
};

export default withAuth(Home);
