import { Box, Stack,  Skeleton } from "@mui/material";


const ItemDetailsHederSkeleton = () => {
  return (
    <Stack
      flexDirection={{ md: "row", xs: "column-reverse" }}
      justifyContent={"space-between"}
      alignItems={{ md: "center", xs: "flex-start" }}
    >
      <Stack>
        <Skeleton
          variant="text"
          sx={{ fontSize: { md: "25px", xs: "20px" } }}
        />

        <Box pl={2}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"80px" }} />
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"55px" }} />{" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"93px" }} />
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"40px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"90px" }} />
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"30px" }} />{" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width:"60px" }} />
          </Stack>
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

export default ItemDetailsHederSkeleton;
