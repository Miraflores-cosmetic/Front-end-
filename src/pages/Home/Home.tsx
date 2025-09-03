import React from "react";
import styles from "./Home.module.scss";
import Header from "@/components/Header/Header";
import TopBlock from "@/components/TopBlock/TopBlock";

const Home: React.FC = () => {
  return (
    <main className={styles.homeContainer}>
      <Header />
      <TopBlock />
    </main>
  );
};

export default Home;
