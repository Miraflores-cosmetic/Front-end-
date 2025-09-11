import React, { useState } from "react";
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
import { Awards } from "@/components/awards/Awards";
import Footer from "@/components/Footer/Footer";
import Drawer from "react-modern-drawer";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeDrawer } from "@/store/slices/drawerSlice";
import BasketDrawer from "@/components/drawers/basket-drawer/BasketDrawer";
import { useScreenMatch } from "@/hooks/useScreenMatch";

const Home: React.FC = () => {
  const activeDrawer = useSelector(
    (state: RootState) => state.drawer.activeDrawer
  );
  const dispatch = useDispatch();

  const isOpen = activeDrawer === "basket" ? true : false;
  const isMobile = useScreenMatch(664);

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
      <Awards />
      <Footer />
      <Drawer
        open={isOpen}
        onClose={() => dispatch(closeDrawer())}
        size={isMobile ? "100%" : 664}
        direction="right"
      >
        <BasketDrawer onClose={() => dispatch(closeDrawer())} />
      </Drawer>
    </main>
  );
};

export default Home;
