import About from "./pages/About";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import "react-modern-drawer/dist/index.css";
import Catalog from "./pages/Catalog/Catalog";
import { useScreenMatch } from "./hooks/useScreenMatch";
import { RootState } from "./store/store";
import Drawer from "react-modern-drawer";

import { useDispatch, useSelector } from "react-redux";
import BasketDrawer from "./components/drawers/basket-drawer/BasketDrawer";
import MenuDrawer from "./components/drawers/menu-drawer/MenuDrawer";
import { closeDrawer } from "./store/slices/drawerSlice";

const App: React.FC = () => {
  const activeDrawer = useSelector(
    (state: RootState) => state.drawer.activeDrawer
  );
  const dispatch = useDispatch();

  const isOpenBasket = activeDrawer === "basket" ? true : false;
  const isOpenMenu = activeDrawer === "menu" ? true : false;
  const isMobileBasket = useScreenMatch(664);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Drawer
        open={isOpenBasket}
        onClose={() => dispatch(closeDrawer())}
        size={isMobileBasket ? "100%" : 664}
        direction="right"
      >
        <BasketDrawer />
      </Drawer>
      <Drawer
        className={styles.drawerContainer}
        open={isOpenMenu}
        onClose={() => dispatch(closeDrawer())}
        size={"100%"}
        duration={1000}
        direction="right"
      >
        <MenuDrawer />
      </Drawer>
    </>
  );
};

export default App;
