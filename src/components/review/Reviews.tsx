import {
  Box,
  Stack,
  Typography,
  Rating,
  Pagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import ProductReviewsSkeleton from "../skeleton/product/ProductReviewsSkeleton";
import AddReview from "./AddReview";
import SortIcon from "@mui/icons-material/Sort";
type Props = {
  id: string;
};

const Reviews = ({ id }: Props) => {
  const [reviewPage, setReviewPage] = React.useState(1);
  const [sort, setSort] = useState("");
  const {
    data: reviewsData,
    isPending,
    refetch,
  } = useMultiQueryHook({
    queries: [`getProductReviews-${id}`, reviewPage, sort],
    url: `/review/${id}?size=5&page=${reviewPage}${
      sort != "" ? "&sort=" + sort : ""
    }`,
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setReviewPage(value);
  };
  const handleSort = () => {
    setSort(sort == "-rating" ? "rating" : "-rating");
  };
  console.log(reviewsData);
  return (
    <Box mt={5}>
      {reviewsData && (
        <>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={1}
            justifyContent={"space-between"}
          >
            <Typography
              fontWeight="bold"
              fontSize={{ md: "30px", xs: "22px" }}
              mb={3}
            >
              Product Reviews
            </Typography>
            <Tooltip title="Sort">
              <IconButton onClick={handleSort}>
                <SortIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          {reviewsData.reviews.length ? (
            <>
              {reviewsData.reviews.map((review: any) => (
                <Box mb={3}>
                  <Stack flexDirection="row" gap={2}>
                    <Stack
                      sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "grey",
                        color: "white",
                        textTransform: "capitalize",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {review.userId?.name?.slice(0, 1)}
                    </Stack>
                    <Box>
                      <Typography fontWeight="bold">
                        {review.userId?.name}
                      </Typography>
                      <Rating value={review.rating} readOnly />
                    </Box>
                  </Stack>
                  <Typography variant="body2" mt={2} px={2}>
                    {review.reviewDisc}{" "}
                  </Typography>
                </Box>
              ))}
              <Pagination
                count={reviewsData.totalPages}
                page={reviewPage}
                variant="outlined"
                color="primary"
                onChange={handleChange}
                sx={{ width: "fit-content", m: "auto", mt: 2 }}
              />
            </>
          ) : (
            <Typography color="grey" textAlign="center" py={5}>
              There are no reviews yet.
            </Typography>
          )}
        </>
      )}
      {!isPending && <AddReview productId={id} refetch={refetch} />}
      {isPending && <ProductReviewsSkeleton />}
    </Box>
  );
};

export default Reviews;
