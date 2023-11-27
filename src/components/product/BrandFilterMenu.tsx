import { MenuItem, Stack, Typography, Menu } from "@mui/material";
import React from 'react'
import useMultiQueryHook from "../../hooks/useMultiQueryHook";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  brandQueryName: string;
  subCategory: string;
  filterWord: string;
  setFilterWord: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const BrandFilterMenu = ({
  open,
  anchorEl,
  setAnchorEl,
  brandQueryName,
  subCategory,
  setFilterWord,
  setPage,
}: Props) => {
    const { data: brands } = useMultiQueryHook({
      queries: [brandQueryName],
      url: `/brand/filter/${subCategory}`,
      selectedProp: "filteredBrands",
    });
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: "20ch",
        },
      }}
    >
      {brands &&
        brands.map((brand: any) => (
          <MenuItem
            onClick={() => {
              setPage(1);
              setFilterWord(brand._id);

            }}
          >
            <Stack
              sx={{
              
                flexDirection: "row",
                alignItems: "center",
              }}
              gap={2}
              p={2}
              mb={2}
            >
              <img src={brand.image.secure_url} style={{ width: "30px" }} />
              <Typography fontWeight={"bold"}>{brand.name}</Typography>
            </Stack>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default BrandFilterMenu