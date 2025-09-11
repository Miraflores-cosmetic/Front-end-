import About from "./pages/About";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import "react-modern-drawer/dist/index.css";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
