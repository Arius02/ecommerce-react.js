import {
  Grid,
  Box,

} from "@mui/material";
import {Skeleton} from "@mui/lab";

const CartPageSkeleton = () => {
  return (
    <>
      {" "}
      <Grid item md={8} xs={12}>
        <Box p={2}>
           { [32,234,53252,22,33].map((product: any) => (
            <Skeleton variant="rectangular" 
            width={"100%"} height={100} key={product} sx={{borderRadius:"8px",mb:3}}/>
        
            ))}
        </Box>
      </Grid>
      <Grid item md={4} xs={12}>
        <Box p={2}>
            <Skeleton variant="rectangular" width={"100%"} height={500} sx={{borderRadius:"8px"}}/>
        </Box>
      </Grid>
    </>
  );
}

export default CartPageSkeleton