import { useProducts } from "../../hooks/useProducts";
import { Product } from "./Products";
import classes from "@/styles/pagination.module.css";

export const Pagination = () => {
  const {
    products,
    isLoading,
    isError,
    currentPage,
    setCurrentPage,
    totalPage,
    search,
    setSearch,
  } = useProducts();

  if (isLoading) return <h4>Loading</h4>;
  if (isError) return <h4>Error</h4>;

  return (
    <div className={`${classes.parent}`}>
      <input
        className={`${classes.inputContainer}`}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
      />
      <div className={`${classes.child1}`}>
        <div className={`${classes.gridContainer}`}>
          {products.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={`${classes.child2}`}>
        <div className={`${classes.btnGroup}`}>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
            className={`${classes.btn}`}
          >
            &lt;
          </button>

          {Array.from({ length: totalPage }, (_, index) => (
            <button
              key={index}
              data-active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${classes.btn}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPage}
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            className={`${classes.btn}`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
