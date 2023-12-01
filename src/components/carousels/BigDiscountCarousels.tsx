import { Stack, Box, Typography,Tooltip } from "@mui/material";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import Gift from "../../SVGs/Gift";
import SectionHeader from "../common/SectionHeader";
import { formatPrice } from "../../utils/priceFormat";
import Slider from "react-slick";
import ProductBoxSkeleton from "../skeleton/product/ProductBoxSkeleton";
import { Link } from "react-router-dom";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 2,
  responsive: [
    {
      breakpoint: 1320,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings:  {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
const BigDiscountCarousels = () => {
     const { data: products, isPending } = useMultiQueryHook({
       queries: ["getBigDiscountProducts"],
       url: `/product?sort=-appliedDiscount&size=8`,
       selectedProp: "products",
     });

                
  return (
    <Box mt={5} overflow={"hidden"}>
      <SectionHeader Icon={Gift} title="New Arrivals" />
      {isPending && <ProductBoxSkeleton/>}
      {products && (
        <Slider {...settings}>
          {products.map((product: any) => (
            <Box
              key={product.customId}
              display="flex"
              flexDirection={"column"}
              sx={{
                backgroundColor: "white",
                width: {
                  
                  xl: "200px !important",
                  lg: "200px !important",
                  md: "200px !important",
                  sm: "250px !important",
                  xs: "180px !important",
                },
              }}
              p={1}
              borderRadius={"8px"}
              mx={3}
            >
              <Stack
                position="relative"
                bgcolor={"white"}
                width={"95%"}
                height={"150px"}
                mx={"auto"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={2}
                borderRadius={"8px"}
                p={"16px"}
                sx={{
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    zIndex: 99,
                    backgroundColor: "black",
                    opacity: 0,
                    transition: ".5s",
                    borderRadius: "8px",
                  },
                  "&:hover": {
                    "&::before": {
                      opacity: 0.4,
                    },
                  },
                }}
                component={Link}
                to={`/product/details/${product._id}`}
              >
                <img
                  src={product.coverImage.secure_url}
                  alt="product image"
                  style={{ width: "100px" }}
                />
              </Stack>

              <Tooltip title={product.name}>
                <Typography fontWeight={"bold"}>
                  {product.name.slice(0, 15)}...
                </Typography>
              </Tooltip>

              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={2}
              >
                <Typography fontWeight={"bold"} color={"secondary"}>
                  {formatPrice(product.priceAfterDiscount)}
                </Typography>
                <Typography
                  variant="body1"
                  color="grey"
                  style={{ textDecoration: "line-through" }}
                >
                  {formatPrice(product.price)}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default BigDiscountCarousels;
