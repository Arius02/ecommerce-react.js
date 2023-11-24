import {
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Dispatch, SetStateAction,  } from "react";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import BrandFiltersSkeleton from "../skeleton/product/BrandFiltersSkeleton";

type Props = {
  brandQueryName: string;
  subCategory:string;
  filterWord:string;
  setFilterWord:Dispatch<SetStateAction<string>>
  setPage:Dispatch<SetStateAction<number>>
};

const BrandFiltersBox = ({
  brandQueryName,
  subCategory,
  filterWord,
  setFilterWord,
  setPage,
}: Props) => {
  const { data: brands,isPending } = useMultiQueryHook({
    queries: [brandQueryName],
    url: `/brand/filter/${subCategory}`,
    selectedProp: "filteredBrands",
  });

  return (
    <Paper sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} fontSize="25px" mb={2}>
        Brands
      </Typography>
      {brands &&
        brands.map((brand: any) => (
          <Stack
            sx={{
              backgroundColor: filterWord == "apple" ? "white" : grey[100],
              boxShadow:
                filterWord == "apple" ? "0 0 20px rgba(0,0,0,.08)" : "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: ".5s",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
            p={2}
            mb={2}
            onClick={() => {
              setPage(1);
              setFilterWord(brand._id);
            }}
          >
            <img src={brand.image.secure_url} style={{ width: "50px" }} />
            <Typography fontWeight={"bold"}>{brand.name}</Typography>
          </Stack>
        ))}
{ isPending&&<BrandFiltersSkeleton/>}
    </Paper>
  );
};

export default BrandFiltersBox;
