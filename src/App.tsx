import About from "./pages/About";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import "react-modern-drawer/dist/index.css";
import Catalog from "./pages/Catalog/Catalog";

import DrawerWrapper from "./components/drawers/DrawerWrapper";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/catalog" element={<Catalog />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>

      <DrawerWrapper />
    </>
  );
};

export default App;
