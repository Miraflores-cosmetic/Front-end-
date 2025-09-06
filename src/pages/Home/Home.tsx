import React from "react";
import styles from "./Home.module.scss";
import Header from "@/components/Header/Header";
import TopBlock from "@/components/TopBlock/TopBlock";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import AboutBlock from "@/components/AboutBlock";
import StepsBlock from "@/components/steps-block/StepsBlock";

const Home: React.FC = () => {
  return (
    <main className={styles.homeContainer}>
      <Header />
      <TopBlock />
      <Bestsellers />
      <AboutBlock />
      <StepsBlock />
    </main>
  );
};

export default Home;
