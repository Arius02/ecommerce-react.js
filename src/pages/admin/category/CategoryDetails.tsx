import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";

import useMultiQueryHook from "../../../hooks/useMultiQueryHook";
import {
  ItemDetailsHeader,
  ItemDetailsHederSkeleton,
  RelatedItemsList,
  RelatedItemsListSkeleton,
} from "../../../components/admin";

const CategoryDetails = () => {
  const { id } = useParams();
  const [subCategoryPage, setSubCategoryPage] = React.useState(1);
  const [ProductPage, setProductPage] = React.useState(1);
  const [loadingIndecator, setLoadingIndecator] = useState("all");
  const { data } = useMultiQueryHook({
    queries: ["getCategory", subCategoryPage, ProductPage],
    url: `/category/${id}?subCategoryPage=${subCategoryPage}&subCategorySize=3&productPage=${ProductPage}&productSize=3`,
    selectedProp: "category",
  });
  const [category, setCategory] = useState<any>(null);
  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);
  return (
    <>
      <Helmet>
        <title>{category?.neme || "category Details"}</title>
      </Helmet>
      {category && (
        <Box>
          <ItemDetailsHeader item={category} key={"saihf89asyui"} />
          {loadingIndecator == "subCategory" && !data ? (
            <RelatedItemsListSkeleton />
          ) : (
            <RelatedItemsList
              items={category.subcategories}
              name="Sub Categories"
              page={subCategoryPage}
              setPage={setSubCategoryPage}
              url="subCategory"
              key={"slkdajeinei"}
              setLoadingIndecator={setLoadingIndecator}
            />
          )}
          {loadingIndecator == "product" && !data ? (
            <RelatedItemsListSkeleton />
          ) : (
            <RelatedItemsList
              items={category.products}
              name="Products"
              page={ProductPage}
              setPage={setProductPage}
              url="product"
              key={"dfdohe8jai"}
              setLoadingIndecator={setLoadingIndecator}
            />
          )}
        </Box>
      )}
      {!category && (
        <Box>
          <ItemDetailsHederSkeleton />
          <RelatedItemsListSkeleton />
          <RelatedItemsListSkeleton />
        </Box>
      )}
    </>
  );
};

export default CategoryDetails;
