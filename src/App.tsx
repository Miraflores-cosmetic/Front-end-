import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import "react-modern-drawer/dist/index.css";
import Catalog from "./pages/Catalog/Catalog";

import DrawerWrapper from "./components/drawers/DrawerWrapper";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import EmailConfirmation from "./pages/  EmailConfirmation/EmailConfirmation";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* <Route path="/email-confirmation" element={<EmailConfirmation />} /> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        <Route path="/catalog/" element={<Catalog />} />
        <Route path="/bestseller/" element={<div>bastreller page</div>} />
      </Routes>

      <DrawerWrapper />
    </>
  );
};

export default App;
