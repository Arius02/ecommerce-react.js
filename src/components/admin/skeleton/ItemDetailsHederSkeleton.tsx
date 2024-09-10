import { Box, Stack, Skeleton } from "@mui/material";

const ItemDetailsHeaderSkeleton = () => {
  const renderSkeletonRow = (widths = ["50px", "80px"]) => (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      {widths.map((width, index) => (
        <Skeleton key={index} variant="text" sx={{ fontSize: "1rem", width }} />
      ))}
    </Stack>
  );

  return (
    <Stack
      flexDirection={{ md: "row", xs: "column-reverse" }}
      justifyContent="space-between"
      alignItems={{ md: "center", xs: "flex-start" }}
    >
      <Stack>
        <Skeleton variant="text" sx={{ fontSize: { md: "25px", xs: "20px" } }} />

        <Box pl={2}>
          {renderSkeletonRow(["50px", "80px"])}
          {renderSkeletonRow(["55px", "93px"])}
          {renderSkeletonRow(["40px", "90px"])}
          {renderSkeletonRow(["30px", "60px"])}
        </Box>
      </Stack>

      <Stack
        alignItems={{ md: "flex-end", xs: "center" }}
        width={{ md: "50%", xs: "100%" }}
      >
        <Skeleton variant="rectangular" width={200} height={200} />
      </Stack>
    </Stack>
  );
};

export default ItemDetailsHeaderSkeleton;
