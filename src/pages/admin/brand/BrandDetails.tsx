import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import useMultiQueryHook from "../../../hooks/useMultiQueryHook";
import { ItemDetailsHeader, ItemDetailsHederSkeleton, RelatedItemsList, RelatedItemsListSkeleton } from "../../../components/admin";
import { Helmet } from "react-helmet";

const BrandDetails = () => {
  const { id } = useParams();
  const [loadingIndecator, setLoadingIndecator] = useState("all");
    const [ProductPage, setProductPage] = React.useState(1);
  const { data } = useMultiQueryHook({
    queries: ["getBrand", ProductPage],
    url: `/brand/${id}?productPage=${ProductPage}&productSize=3`,
    selectedProp: "brand",
  });
  const [brand, setBrand] = useState<any>(null);
  useEffect(() => {
    if (data) {
      setBrand(data);
    }
  }, [data]);
  return (
    <>
      <Helmet>
        <title>{brand?.neme||"Brand Details"}</title>
      </Helmet>
      {brand && (
        <Box>
          <ItemDetailsHeader item={brand} key={"duhdssjn"} />

          {loadingIndecator == "product" && !data ? (
            <RelatedItemsListSkeleton />
          ) : (
            <RelatedItemsList
              items={brand.products}
              name="Products"
              page={ProductPage}
              setPage={setProductPage}
              url="product"
              key={"vcxsvds"}
              setLoadingIndecator={setLoadingIndecator}
            />
          )}
        </Box>
      )}
      {!brand && (
        <Box>
          <ItemDetailsHederSkeleton />
          <RelatedItemsListSkeleton />
        </Box>
      )}
    </>
  );
};

export default BrandDetails;
