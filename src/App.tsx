import { Routes, Route } from "react-router-dom";
import "react-modern-drawer/dist/index.css";
import Home from "@/pages/Home/Home";
import Catalog from "@/pages/Catalog/Catalog";
import DrawerWrapper from "./components/drawers/DrawerWrapper";
import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import EmailConfirmation from "@/pages/EmailConfirmation/EmailConfirmation";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import BestSeller from "@/pages/BestSeller/BestSeller";
import FacePage from "./pages/Face/Face";
import Articles from "./pages/Articles/Articles";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/catalog/" element={<Catalog />} />
        <Route path="/bestseller" element={<BestSeller />} />
        <Route path="/face" element={<FacePage />} />
        <Route path="about/articles" element={<Articles />} />
        <Route path="about/articles/:id" element={<ArticleDetail />} />
      </Routes>

      <DrawerWrapper />
    </>
  );
};

export default App;
