import {
  Box,
  Stack,
  Typography,
  Rating,
  Pagination,
} from "@mui/material";
import React from "react";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import ProductReviewsReviews from "../skeleton/product/ProductReviewsReviews";

type Props = {
  id: string;
};

const Reviews = ({id}: Props) => {
  const [reviewPage, setReviewPage] = React.useState(1);
  const { data: reviewsData, isPending } =
    useMultiQueryHook({
      queries: ["getProductReviews", reviewPage],
      url: `/review/${id}?size=5&page=${reviewPage}`,
    });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setReviewPage(value);
  };
  return (
    <Box mt={5}>
      {reviewsData && (
        <>
          <Typography fontWeight="bold" fontSize={{ md: "30px", xs: "22px" }}>
            Product Reviews
          </Typography>
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
                  {review.userId.name.slice(0, 1)}
                </Stack>
                <Box>
                  <Typography fontWeight="bold">
                    {review.userId.name}
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
      )}
      {isPending&&<ProductReviewsReviews/>}
    </Box>
  );
};

export default Reviews;
