"use client";
// pages/index.js
import HomePage from "@/app/pages/home";
import { withAuth } from "./components/withAuth";
import Layout from "./layouts/Layout";

const Home = () => {
  return (
    <Layout containerStyles="py-10 m-0">
      <HomePage />
    </Layout>
  );
};

export default withAuth(Home);
