import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  ItemDetailsHeader,
  ItemDetailsHederSkeleton,
  RelatedItemsList,
  RelatedItemsListSkeleton,
} from "../../../components/admin";

import useMultiQueryHook from "../../../hooks/useMultiQueryHook";
import { Helmet } from "react-helmet";

const SubbCategoryDetails = () => {
  const { id } = useParams();
  const [ProductPage, setProductPage] = React.useState(1);
  const [loadingIndecator, setLoadingIndecator] = useState("all");
  const { data } = useMultiQueryHook({
    queries: ["getSubCategory", ProductPage],
    url: `/subCategory/${id}?productPage=${ProductPage}&productSize=3`,
    selectedProp: "subCategory",
  });
  const [subCategory, setSubCategory] = useState<any>(null);
  useEffect(() => {
    if (data) {
      setSubCategory(data);
    }
  }, [data]);
  return (
    <>
      <Helmet>
        <title>{subCategory?.neme || "Sub Category Details"}</title>
      </Helmet>
      {subCategory && (
        <Box>
          <ItemDetailsHeader item={subCategory} key={"duhdssjn"} />

          {loadingIndecator == "product" && !data ? (
            <RelatedItemsListSkeleton />
          ) : (
            <RelatedItemsList
              items={subCategory.products}
              name="Products"
              page={ProductPage}
              setPage={setProductPage}
              url="product"
              key={"sbbgdfc"}
              setLoadingIndecator={setLoadingIndecator}
            />
          )}
        </Box>
      )}
      {!subCategory && (
        <Box>
          <ItemDetailsHederSkeleton />
          <RelatedItemsListSkeleton />
        </Box>
      )}
    </>
  );
};

export default SubbCategoryDetails;
