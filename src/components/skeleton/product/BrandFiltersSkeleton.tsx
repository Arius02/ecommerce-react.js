import { Skeleton } from "@mui/lab";

const BrandFiltersSkeleton = () => {
  return (
      [1,2,3,4].map((brand:any)=>(

            <Skeleton
              key={brand}
              variant="rectangular"
              sx={{ borderRadius: "5px",mb:2 }}
              width={"100%"}
              height={50}
              
            />
        ))
  );
}

export default BrandFiltersSkeleton