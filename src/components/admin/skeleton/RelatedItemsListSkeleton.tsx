

import {
  Box,
  Stack,
 
  Skeleton,
} from "@mui/material";
const RelatedItemsListSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: { md: "20px", xs: "18px" } ,width:"150px" ,my:3}} />
      <Stack flexDirection="row" justifyContent="space-around" flexWrap="wrap">
        {Array.from(Array(5).keys()).map((_, index) => (
          <Stack key={index} alignItems="center" justifyContent={"center"}>
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton
              variant="text"
              sx={{ fontSize: { md: "18px", xs: "16px" , mt:2 ,width:"100px"} }}

            />
          </Stack>
        ))}
      </Stack>
  
    </Box>
  );
}

export default RelatedItemsListSkeleton