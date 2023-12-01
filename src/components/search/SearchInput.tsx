import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { grey, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = (e.target as HTMLFormElement).elements;
    const inputValue = (
      formElements.namedItem("searchInput") as HTMLInputElement | null
    )?.value;
    if (inputValue?.length) {
      navigate(`/search/${inputValue}`);
    }
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
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
        }}
        name="searchInput"
        placeholder="Search In Bazar"
        inputProps={{ "aria-label": "search in bazar" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
