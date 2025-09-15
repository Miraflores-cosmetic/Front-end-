import React from "react";
import styles from "./CatalogList.module.scss";
import krem from "@/assets/images/krem.webp";

interface CatalogItem {
  id: number;
  title: string;
  image: string;
}
interface CatalogProps {
  items: CatalogItem[];
}

const CatalogList: React.FC = () => {
  // например, передаем из родителя
  const items = [
    { id: 1, title: "Крем 1", image: krem },
    { id: 2, title: "Крем 2", image: krem },
    { id: 3, title: "Крем 3", image: krem },
    { id: 4, title: "Крем 4", image: krem },
    { id: 5, title: "Крем 5", image: krem },
    { id: 6, title: "Крем 6", image: krem },
    { id: 7, title: "Крем 7", image: krem },
    { id: 8, title: "Крем 8", image: krem },
    { id: 9, title: "Крем 9", image: krem },
    { id: 10, title: "Крем 10", image: krem },
    { id: 11, title: "Крем 11", image: krem },
    { id: 12, title: "Крем 12", image: krem },
  ];

  /**
   * Схема сетки: каждая строка – массив «ячейки».
   * В ячейке либо индекс элемента из items (по порядку),
   * либо null для плейсхолдера.
   * Дополнительно можно задать span и col.
   */
  const layout: { index: number | null; span?: number; col?: number }[][] = [
    // row 1
    [{ index: 0, span: 2 }, { index: 1 }, { index: 2 }],
    // row 2
    [{ index: null }, { index: null }, { index: 3, col: 3 }, { index: null }],
    // row 3
    [{ index: 4 }, { index: 5 }, { index: 6, span: 2 }, { index: null }],
    // row 4 – Крем 8
    [{ index: null }, { index: 7, col: 2 }, { index: null }, { index: null }],
    // // row 5 – Крем 9–12
    [{ index: 8 }, { index: 9 }, { index: 10 }, { index: 11 }],
  ];

  return (
    <div className={styles["catalog-grid"]}>
      {layout.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          // пустая колонка → placeholder
          if (cell.index === null) {
            return <div key={`ph-${cIdx}`} className={styles.placeholder} />;
          }

          const item = items[cell.index];
          if (!item) return null;

          const gridStyle: React.CSSProperties = {};
          if (cell.span) gridStyle.gridColumn = `span ${cell.span}`;
          if (cell.span) gridStyle.gridRow = `span 2`;
          if (cell.col) gridStyle.gridColumnStart = cell.col; // col = 3 → класс start-3

          return (
            <div key={item.id} className={styles.item} style={gridStyle}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CatalogList;
