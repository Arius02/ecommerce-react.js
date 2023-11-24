import {
  Paper,
  Stack,
  Skeleton,
  Box,
  Stepper,
  Step,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const UserOrderDetailsSkeleton = () => {
  return (
    <>
      <Paper sx={{ px: 3, py: 5, my: 5, display: "flex" }}>
        <Stepper
          connector={
            <Skeleton
              sx={{
                width: { lg: "200px", md: "150px", sm: "150px", xs: "100px" },
              }}
            />
          }
          sx={{display:"flex",justifyContent:"center", width:"100%"}}
        >
          {["proccess", "Shipped", "Delivered"].map((label) => (
            <Step key={label}>
              <Skeleton variant="circular" width={"50px"} height="50px" />
            </Step>
          ))}
        </Stepper>
      </Paper>
      <Paper>
        <Stack
          sx={{
            backgroundColor: grey[200],
            px: 2,
            py: 1,
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"row"}
          flexWrap="wrap"
        >
          <Skeleton variant="text" sx={{ fontSize: "20px", width: "150px" }} />
          <Skeleton variant="text" sx={{ fontSize: "20px", width: "80px" }} />

          <Skeleton sx={{ fontSize: "20px", width: "120px" }} variant="text" />
        </Stack>
        <Box>
          {[324, 523, 266].map((product: any) => (
            <Stack
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              key={product}
              px={2}
              py={1}
              flexWrap={"wrap"}
            >
              <Stack flexDirection="row" alignItems={"center"} gap={2}>
                <Skeleton variant="rectangular" width="50px" height={"60px"} />
                <Box>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "25px", width: "100px" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "18px", width: "70px" }}
                  />
                </Box>
              </Stack>
              <Skeleton
                variant="text"
                sx={{ fontSize: "16px", width: "170px" }}
              />

              <Skeleton
                sx={{ fontSize: "25px", width: "100px" }}
                variant="text"
              />
            </Stack>
          ))}
        </Box>
      </Paper>
      <Stack
        flexDirection="row"
        justifyContent={"space-between"}
        flexWrap="wrap"
        mt={5}
      >
        <Paper sx={{ p: 2, width: { md: "48%", xs: "100%" }, mb: 2 }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "22px", width: "100px", mb: 3 }}
          />
          <Skeleton variant="text" sx={{ fontSize: "18px", width: "170px" }} />
          <Skeleton variant="text" sx={{ fontSize: "18px", width: "110px" }} />
        </Paper>
        <Paper sx={{ p: 2, width: { md: "48%", xs: "100%" }, mb: 2 }}>
          <Skeleton variant="text" sx={{ fontSize: "22px", width: "90px" }} />
          <Stack
            flexDirection="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "18px", width: "100px" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "18px", width: "80px" }} />
          </Stack>
          <Stack
            flexDirection="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "18px", width: "100px" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "18px", width: "80px" }} />
          </Stack>
          <Skeleton variant="text" sx={{ fontSize: "14px", width: "120px" }} />
        </Paper>
      </Stack>
    </>
  );
};

export default UserOrderDetailsSkeleton;
