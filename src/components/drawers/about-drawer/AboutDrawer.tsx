import React from "react";
import styles from "./AboutDrawer.module.scss";

import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";
import { useNavigate } from "react-router-dom";

const AboutDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = () => {
    dispatch(closeDrawer());
    navigate("/order");
  };

  return (
    <div className={`${styles.drawer}`} onClick={handleOrder}>
      <div className={styles.contentWrapper}>About</div>
      <div className={styles.orderButtonContainer}></div>
    </div>
  );
};

export default AboutDrawer;
