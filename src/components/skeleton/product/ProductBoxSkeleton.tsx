import {Grid,Paper,Stack} from "@mui/material"
import {Skeleton} from "@mui/lab"
const ProductBoxSkeleton= ()=> {
  return (
    <Paper
      sx={{ px: { md: 2, xs: 0 }, py: 2, borderRadius: "8px" }}
      elevation={0}
    >
      <Grid container>
        {[0, 2, 3, 4, 5, 6].map((product: any) => (
          <Grid xl={2} md={4} xs={6} key={product + "jsk"}>
            <Stack alignItems={"center"} p={2}>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"150px"}
                sx={{ borderRadius: "8px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: { md: "32px", xs: "20px" } }}
                width={"80%"}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: { md: "22px", xs: "16px" } }}
                width={"65%"}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default ProductBoxSkeleton