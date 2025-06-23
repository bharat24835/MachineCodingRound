import classes from "@/styles/pagination.module.css";

interface ProductProps {
  item: {
    title: string;
    images: string[];
  };
}

export const Product: React.FC<ProductProps> = ({ item }) => {
  return (
    <div className={`${classes.productContainer}`}>
      <img
        className={`${classes.image}`}
        src={item.images[0]}
        alt={item.title}
      />
      <p className={`${classes.para}`}>{item.title}</p>
    </div>
  );
};
