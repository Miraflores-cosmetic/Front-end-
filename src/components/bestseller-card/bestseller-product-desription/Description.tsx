import ProductDetails, {
  DetailItem,
} from "@/components/bestseller-card/best-product-detail/ProductDetails";
import styles from "./Description.module.scss";
const Description: React.FC = () => {
  const details: DetailItem[] = [
    { label: "тип продукта", value: "мист" },
    { label: "этап", value: "увлажнение" },
    { label: "группа ароматов", value: "фруктовые" },
    { label: "тип продукта", value: "мист" },
  ];
  return (
    <div className={styles.descContainer}>
      <p className={styles.desc}>
        {`Купаж гидролатов тысячелистника, мелиссы, листа земляники, зеленого
            чая, кипрея, мяты перечной; меристемный экстракт люпина, почек клена
            вязолистного и терна, экстракты розы, шалфея, примулы вечерней,
            мальвы, календулы, розмарина; экстракт комбучи, трипептид меди
            (copper tripeptide-1), экстракты клевера, солодки, хмеля; комплекс
            аминокислот, растительный ретинол (экстракт голубой водоросли
            ланаблю), ниацинамид, фукогель, эктоин, гликосфинголипиды,
            аллантоин, глицерин, дигидрокверцетин, арабиногалактан,
            пентиленгликоль, глюконолактон, л глютаминовая кислота,  янтарная
            кислота, шаромикс 721`}
      </p>
      <div>
        <ProductDetails details={details} />
      </div>
    </div>
  );
};

export default Description;
