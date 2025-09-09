import React from "react";
import styles from "./Home.module.scss";
import Header from "@/components/Header/Header";
import TopBlock from "@/components/TopBlock/TopBlock";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import AboutBlock from "@/components/AboutBlock";
import StepsBlock from "@/components/steps-block/StepsBlock";
import { InfoTest } from "@/components/take-test/InfoTestBlock";
import { Sets } from "@/components/sets/Sets";
import { Reviews } from "@/components/take-test/reviews/Reviews";
import { GratitudeProgram } from "@/components/gratitude-program/GratitudeProgram";

const Home: React.FC = () => {
  return (
    <main className={styles.homeContainer}>
      <Header />
      <TopBlock />
      <Bestsellers />
      <AboutBlock />
      <StepsBlock />
      <InfoTest />
      <Sets />
      <Reviews />
      <GratitudeProgram />
    </main>
  );
};

export default Home;
