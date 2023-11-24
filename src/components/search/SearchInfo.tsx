import  { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Stack,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
            IconButton

} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
type Props = {
  sortTerm: string;
  setSortTerm: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setFilterSearch: Dispatch<SetStateAction<boolean>>;
};
    
const SearchInfo = ({
  sortTerm,
  setSortTerm,
  searchTerm,
  setFilterSearch,
}: Props) => {
  const handleChange = (event: any) => {
    setSortTerm(event.target.value);
  };
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        flexDirection="row"
        alignItems={"center"}
        justifyContent="space-between"
        flexWrap={"wrap"}
        gap={3}
      >
        <Box>
          <Typography fontWeight="bold" fontSize="18px">
            Searching for “ {searchTerm} ”
          </Typography>
          
        </Box>
        <Stack flexDirection={"row"}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography sx={{ whiteSpace: "nowrap" }} color="grey">
              Sort by:{" "}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sortTerm}
                label="Sort"
                onChange={handleChange}
              >
                <MenuItem value={"revelance"}>Revelance</MenuItem>
                <MenuItem value={"-rating"}>Rating</MenuItem>
                <MenuItem value={"createdAt"}>Date</MenuItem>
                <MenuItem value={"-sold"}>Most Sell</MenuItem>
                <MenuItem value={"-appliedDiscount"}>Discount</MenuItem>
                <MenuItem value={"price"}>Price Low to High</MenuItem>
                <MenuItem value={"-price"}>Price High to Low</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              type="button"
              sx={{ p: "14px" }}
              aria-label="search"
              onClick={() => setFilterSearch(true)}
            >
              <FilterListIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SearchInfo