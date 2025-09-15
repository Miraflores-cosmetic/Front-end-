import React, { JSX } from "react";
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
    { id: 13, title: "Крем 13", image: krem },
    { id: 14, title: "Крем 14", image: krem },
    { id: 15, title: "Крем 15", image: krem },
    { id: 16, title: "Крем 16", image: krem },
    { id: 17, title: "Крем 16", image: krem },
    { id: 18, title: "Крем 17", image: krem },
    { id: 18, title: "Крем 18", image: krem },
    { id: 18, title: "Крем 18", image: krem },
    { id: 18, title: "Крем 20", image: krem },
    { id: 18, title: "Крем 21", image: krem },
  ];

  const layout: { index: number | null; span?: number; col?: number }[][] = [
    [{ index: 0, span: 2 }, { index: 1 }, { index: 2 }],
    [{ index: null }, { index: null }, { index: 3, col: 3 }, { index: null }],
    [{ index: 4 }, { index: 5 }, { index: 6, span: 2 }, { index: null }],
    [{ index: null }, { index: 7, col: 2 }, { index: null }, { index: null }],
    [{ index: 8 }, { index: 9 }, { index: 10 }, { index: 11 }],
  ];

  let renderedIndex = 0; // чтобы пройтись по всем items

  const totalRows: JSX.Element[] = [];

  while (renderedIndex < items.length) {
    layout.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (renderedIndex >= items.length) return;

        if (cell.index === null) {
          totalRows.push(
            <div
              key={`ph-${renderedIndex}-${rIdx}-${cIdx}`}
              className={styles.placeholder}
            />
          );
        } else {
          const item = items[renderedIndex];
          const gridStyle: React.CSSProperties = {};
          if (cell.span) gridStyle.gridColumn = `span ${cell.span}`;
          if (cell.span) gridStyle.gridRow = `span 2`;
          if (cell.col) gridStyle.gridColumnStart = cell.col;

          totalRows.push(
            <div key={item.id} className={styles.item} style={gridStyle}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>
          );

          renderedIndex++;
        }
      });
    });
  }

  return <div className={styles["catalog-grid"]}>{totalRows}</div>;
};

export default CatalogList;
