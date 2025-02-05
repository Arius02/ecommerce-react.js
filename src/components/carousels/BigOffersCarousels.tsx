import { Stack, Button, Typography, Container,  } from "@mui/material";
import offerImage from "../../assets/nike-black.png"
import { blueGrey, grey,  } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import Slider from "react-slick";
   const settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
   };
const BigOffersCarousels = () => {
  
  const items = [
    {
      name: "50% Off For Your First Shopping",
      description: "Sign up now and get an exclusive 50% discount on your first purchase. Limited time offer!",
    },
    {
      name: "35% Off For Your First Order",
      description: "New customers get 35% off their first order. Join us today and start saving!",
    },
  ];

  return (
    <Stack bgcolor={"white"} sx={{overflowX:"hidden", overflowY:"visible"}}>
    <Container maxWidth="xl">

      <Slider
        {...settings}
        >

        {items.map((item, i) => (
          <Stack
          key={i}
            p={3}
            flexDirection={{ md: "row", xs: "column" }}
            justifyContent={"space-between"}
            alignItems={{ md: "center", xs: "flex-start" }}
            width={"100%"}
          >
            <Stack
            >
              <Typography
                variant="h2"
                fontSize={{ md: "60px", sm: "35px", xs: "25px" }}
                color={blueGrey[900]}
                maxWidth={{ md: "70%", xs: "100%" }}
                fontWeight={"bold"}
              >
                {item.name}
              </Typography>
              <Typography color={grey[700]}>{item.description}</Typography>
              <Button
                variant="contained"
                color={"secondary"}
                component={RouterLink}
                to="#top-rated"
                sx={{
                  maxWidth: "150px",
                  my: 2,
                  py: 1.5,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                Check it out!
              </Button>
            </Stack>
            <Stack
              alignItems={{ md: "flext-start", xs: "center" }}
              width={{ md: "500px", xs: "100%" }}
            >
              <img
                src={offerImage}
                loading="lazy"
                alt="offer"
                style={{ width: "100%" }}
              />
            </Stack>
          </Stack>
        ))} 
      </Slider>
      </Container>
    </Stack>
  );
}
 
export default BigOffersCarousels


