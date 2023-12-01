import React, { Dispatch, SetStateAction } from "react";

import {
  Box,
  Stack,
  Typography,
  Pagination,
  Link,
  Tooltip
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
type Props = {
  name: string;
  items: {
    name: string;
    image?: {
      secure_url: string;
    };
    coverImage?: {
      secure_url: string;
    };
  }[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  url: string;
  setLoadingIndecator:Dispatch<SetStateAction<string>>
};

const RelatedItemsList = ({
  name,
  items,
  page,
  setPage,
  url,
  setLoadingIndecator,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event) // to be clear
    setPage(value);
    setLoadingIndecator(url)
  };
  return (
    <Box>
      <Typography
        component={"h2"}
        fontSize={{ md: "20px", xs: "18px" }}
        my={2}
        fontWeight={"bold"}
      >
        Related {name}
      </Typography>
      <Stack flexDirection="row" justifyContent="space-around" flexWrap="wrap">
        {items.map((item: any) => (
          <Link
            component={RouterLink}
            to={`/dashboard/${url}/details/${item._id}`}
            underline="none"
            color="black"
          >
            <Stack
              key={item.name}
              alignItems="center"
              justifyContent={"center"}
            >
              <Box width={"100px"} p={2}>
                <img
                  src={
                    url == "product"
                      ? item.coverImage.secure_url
                      : item.image.secure_url
                  }
                  loading="lazy"
                  style={{ width: "100%", }}
                />
              </Box>
              <Tooltip title={item.name}>
                <Typography
                  fontWeight="bold"
                  variant="h4"
                  fontSize={{ md: "18px", xs: "16px" }}
                  mt={1}
                >
                  {item.name.slice(0, 20)}
                </Typography>
              </Tooltip>
            </Stack>
          </Link>
        ))}
        {items.length == 0 && (
          <Stack
            alignItems="center"
            justifyContent={"center"}
            height={"120px"}
            gap={2}
          >
            <Typography>There are no {name} :)</Typography>
            <Typography>
              Want to Add {name}?{" "}
              <Link component={RouterLink} to={`/dashboard/${url}/add`}>
                Add.
              </Link>
            </Typography>
          </Stack>
        )}
      </Stack>
      <Pagination
        count={5}
        page={page}
        variant="outlined"
        color="primary"
        onChange={handleChange}
        sx={{ width: "fit-content", m: "auto", mt: 2 }}
      />
    </Box>
  );
};

export default RelatedItemsList;
