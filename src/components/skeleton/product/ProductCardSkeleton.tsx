import { Box, Grid } from "@mui/material";
import { Skeleton } from "@mui/lab";

type Props={
  columns:{
    lg?:number,
    md:number,
    sm?:number,
    xs:number
  }
}
const ProductCardSkeleton = ({columns}:Props) => {
  return [1, 2, 3, 4, 5, 6].map((product: any) => (
    <Grid item {...columns} key={product + "Sdoj"} mt={2} width={{md:"33.3%",sm:"50%",xs:"100%"}}>
      <Box px={1} >
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px" }}
          width={"100%"}
          height={418}
        />
      </Box>
    </Grid>
  ));
};

export default ProductCardSkeleton;
