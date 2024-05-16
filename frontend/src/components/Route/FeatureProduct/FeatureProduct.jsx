import React from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const FeatureProduct = () => {
  const { allProducts } = useSelector((state) => state.product);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Feature Product</h1>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {allProducts && allProducts.length !== 0 && (
              <>
                {allProducts &&
                  allProducts
                    .map((i, index) => {
                      return <ProductCard data={i} key={index} />;
                    })
                    .slice(0, 5)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
