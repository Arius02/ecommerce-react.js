import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { grey, pink } from '@mui/material/colors';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
type Props = {}

const SearchInput = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchCategory, setSearchCategory]=React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (searchWord:string) => {
    setAnchorEl(null);
    setSearchCategory(searchWord);
  };
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        boxShadow: "none",
        border: 1,
        borderColor: grey[300],
        borderRadius: "30px",
        overflowX: "hidden",
        "&:hover": {
          borderColor: pink[100],
        },
        transition: ".1s ",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder="Search In Bazar"
        inputProps={{ "aria-label": "search in bazar" }}
      />
      <IconButton
        sx={{
          p: "10px",
          borderRadius: 0,
          bgcolor: grey[100],
          fontSize: 18,
          borderLeft: 1,
          borderColor: grey[300],
        }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {searchCategory == "" ? "All Categories" : searchCategory}
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("")}> All Categories</MenuItem>
        <MenuItem onClick={() => handleClose("Electronics")}>
          Electronics
        </MenuItem>
        <MenuItem onClick={() => handleClose("Fashion")}>Fashion</MenuItem>
        <MenuItem onClick={() => handleClose("Home & Kitchen")}>
          Home & Kitchen
        </MenuItem>
        <MenuItem onClick={() => handleClose("Furniture")}>Furniture</MenuItem>
      </Menu>
    </Paper>
  );
}

export default SearchInput