import React from "react";
import styles from "./Catalog.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Catalog: React.FC = () => {
  const activeDrawer = useSelector(
    (state: RootState) => state.drawer.activeDrawer
  );
  const dispatch = useDispatch();

  const isOpenBasket = activeDrawer === "basket" ? true : false;
  // const isOpenMenu = activeDrawer === "menu" ? true : false;
  const isMobileBasket = useScreenMatch(664);

  return (
    <main className={styles.catalogContainer}>
      <Header />
      <div>cfffffd</div>
      <Footer />
    </main>
  );
};

export default Catalog;
