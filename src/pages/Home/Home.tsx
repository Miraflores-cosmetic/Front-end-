import React from "react";
import styles from "./Home.module.scss";
import Header from "@/components/Header/Header";
import TopBlock from "@/components/TopBlock/TopBlock";
import Bestsellers from "@/components/bestsellers/Bestsellers";

const Home: React.FC = () => {
  return (
    <main className={styles.homeContainer}>
      <Header />
      <TopBlock />
      <Bestsellers />
    </main>
  );
};

export default Home;
