"use client";
// pages/index.js
import HomePage from "@/app/pages/home";
import { withAuth } from "./components/withAuth";
import Layout from "./layouts/Layout";

const Home = () => {
  
  return (
    <Layout containerStyle="w-full flex justify-center items-center py-20 px-10 lg:px-64">
      <HomePage />
    </Layout>
  );
};

export default withAuth(Home);
