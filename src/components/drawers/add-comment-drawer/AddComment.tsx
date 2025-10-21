import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import krem from "@/assets/images/krem.webp";

import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";
import star from "@/assets/icons/star.svg";
import emptyStar from "@/assets/icons/emptyStar.svg";
import { TextField } from "@/components/text-field/TextField";

const AddCommentDrawer: React.FC = () => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  return (
    <div className={`${styles.drawer}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <p className={styles.title}>ОСтавить отзыв</p>
          <p
            onClick={() => dispatch(closeDrawer())}
            className={styles.closeTxt}
          >
            Закрыть
          </p>
        </div>
        <div className={styles.listWrapper}>
          <article className={styles.commentCart}>
            <div className={styles.imgNameWrapper}>
              <div className={styles.imageWrapper}>
                <img src={krem} alt="krem" className={styles.image} />
              </div>
              <div className={styles.nameWrapper}>
                <p className={styles.title}>
                  Цветочный мист с экстрактами розы
                </p>
                <p className={styles.size}>50 мл</p>
              </div>
            </div>
            <div className={styles.rateWrapper}>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? star : emptyStar}
                    alt={`rate ${i + 1}`}
                  />
                ))}
            </div>
            <div className={styles.inputWrapper}>
              {" "}
              <TextField
                placeholder="Как вам товар?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AddCommentDrawer;
