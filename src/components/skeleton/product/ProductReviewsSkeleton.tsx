import { Box, Stack, } from "@mui/material";
import { Skeleton } from "@mui/lab";
const ProductReviewsSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="text"
        sx={{ fontSize: { md: "25px", xs: "12px" }, mt: 5 }}
        width={180}
      />
      {[34, 53, 535, 32].map((review) => (
        <Box mb={3} key={review}>
          <Stack flexDirection="row" gap={2}>
            <Skeleton
              variant="circular"
              sx={{ width: "50px", height: "50px" }}
            />
            <Box>
              <Skeleton variant="text" sx={{ fontSize: "20px" }} width={100} />
              <Skeleton variant="text" sx={{ fontSize: "16px" }} width={90} />
            </Box>
          </Stack>
          <Skeleton variant="text" sx={{ fontSize: "20px" }} width={300} />
        </Box>
      ))}
    </>
  );
};

export default ProductReviewsSkeleton;
