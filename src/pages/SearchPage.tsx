import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Grid,
  Drawer,
  IconButton,
  Container,
  Pagination,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useMultiQueryHook from "../hooks/useMultiQueryHook";
import { SearchFilters, SearchInfo } from "../components";
import CloseIcon from "@mui/icons-material/Close";
import ProductCard from "../components/product/ProductCard";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [sortTerm, setSortTerm] = React.useState("revelance");
  const [page, setPage] = React.useState(1);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceValue, setPriceValue] = useState([0, 50000]);

  const { data, isPending } = useMultiQueryHook({
    queries: [
      "getSearchProducts",
      page,
      sortTerm,
      searchTerm as string,
      selectedRatings as unknown as string,
    ],
    url: `/product?page=${page}&size=10&search=${searchTerm}${
      sortTerm != "revelance" ? "&sort=" + sortTerm : ""
    }${
      selectedRatings.length > 0
        ? "&rating[in]=" + JSON.stringify(selectedRatings)
        : ""
    }&price[gte]=${priceValue[0]}&price[lte]=${priceValue[1]}`,
    // selectedProp:"products"
  });
    const show = useSelector((state: any) => state.screenSize.show);

  const [FilterSearch, setFilterSearch] = React.useState(false);
 const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
   console.log(event); // to be clear
   setPage(value);
 };
  return (
      <Container maxWidth="xl">
        <Box p={2}>
          <SearchInfo
            sortTerm={sortTerm}
            setSortTerm={setSortTerm}
            searchTerm={searchTerm || ""}
            setFilterSearch={setFilterSearch}
          />
          {show && (
            <React.Fragment key={"left"}>
              <Drawer
                anchor={"left"}
                variant="temporary"
                open={FilterSearch}
                onClose={() => setFilterSearch(false)}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    p: 2,
                  },
                }}
              >
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={2}
                >
                  <Typography>Search in Bazar</Typography>
                  <IconButton
                    type="button"
                    sx={{ p: "14px" }}
                    aria-label="close"
                    onClick={() => setFilterSearch(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <SearchFilters
                  selectedRatings={selectedRatings}
                  setSelectedRatings={setSelectedRatings}
                  priceValue={priceValue}
                  setPriceValue={
                    setPriceValue as Dispatch<SetStateAction<number | number[]>>
                  }
                />
              </Drawer>
            </React.Fragment>
          )}
          <Grid container mt={5}>
            {!show && (
              <Grid md={3} xs={0}>
                <Paper sx={{ p: 4, borderRaduis: "8px" }}>
                  <SearchFilters
                    selectedRatings={selectedRatings}
                    setSelectedRatings={setSelectedRatings}
                    priceValue={priceValue}
                    setPriceValue={
                      setPriceValue as Dispatch<
                        SetStateAction<number | number[]>
                      >
                    }
                  />
                </Paper>
              </Grid>
            )}
            <Grid md={9} xs={12} pl={{ md: 2, xs: 0 }}>
              {isPending&&<p>loading...</p>}
              {data && (
                <Grid container columns={12} rowGap={3}>
                  {data.products.map((product: any) => (
                    <Grid lg={4} md={6} xs={12}>
                      <Box px={1}>
                        {/* <ProductCard product={product} /> */}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
           {data&& <Pagination
              count={data.totalPages }
              page={page}
              variant="outlined"
              color="primary"
              onChange={handleChange}
              sx={{ width: "fit-content", m: "auto", mt: 2 }}
            />}
          </Grid>
        </Box>
      </Container>
    
  );
};

export default SearchPage;
