import React, { JSX } from "react";
import styles from "./CatalogList.module.scss";
import kremgroup from "@/assets/images/kremgroup.webp";
import hear from "@/assets/images/hear.webp";
import etap3 from "@/assets/images/etap3.webp";
import etap2 from "@/assets/images/etap2.webp";
import etap4 from "@/assets/images/etap4.webp";
import face from "@/assets/images/face.webp";
import { useScreenMatch } from "@/hooks/useScreenMatch";

interface CatalogItem {
  id: number;
  title: string;
  image: string;
}
interface CatalogProps {
  items: CatalogItem[];
}
const CatalogList: React.FC = () => {
  const isMobile = useScreenMatch(768);

  const items = [
    { id: 1, title: "Наборы", image: kremgroup },
    { id: 2, title: "Волосы", image: hear },
    { id: 3, title: "Лицо", image: etap3 },
    { id: 4, title: "Волосы", image: hear },
    { id: 5, title: "Волосы", image: etap2 },
    { id: 6, title: "Лицо", image: face },
    { id: 7, title: "Наборы", image: etap4 },
    { id: 8, title: "Волосы", image: hear },
    { id: 9, title: "Лицо", image: etap2 },
    { id: 10, title: "Лицо", image: face },
    { id: 11, title: "Лицо", image: etap3 },
    { id: 12, title: "Лицо", image: etap4 },
  ];

  const layout: { index: number | null; span?: number; col?: number }[][] = [
    [{ index: 0, span: 2 }, { index: 1 }, { index: 2 }],
    [{ index: null }, { index: null }, { index: 3, col: 3 }, { index: null }],
    [{ index: 4 }, { index: 5 }, { index: 6, span: 2 }, { index: null }],
    [{ index: null }, { index: 7, col: 2 }, { index: null }, { index: null }],
    [{ index: 8 }, { index: 9 }, { index: 10 }, { index: 11 }],
  ];

  let renderedIndex = 0;

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
          if (cell.span && !isMobile)
            gridStyle.gridColumn = `span ${cell.span}`;
          if (cell.span && !isMobile) gridStyle.gridRow = `span ${cell.span}`;
          if (cell.col && !isMobile) gridStyle.gridColumnStart = cell.col;

          totalRows.push(
            <div key={item.id} className={styles.item} style={gridStyle}>
              <img src={item.image} alt={item.title} />
              <p className={styles.itemTitle}>{item.title}</p>
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
