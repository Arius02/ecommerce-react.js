import {
  Box,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
type Props = {
    item:{
        name:string,
        slug:string
        image:{
            secure_url:string
        },
        createdBy:string,
        createdAt:string,
        updatedAt:string,
        category?:{
          categoryId:{
            name:string
          }
        }
    }
};

const ItemDetailsHeader = ({item}: Props) => {
  return (
    <Stack
      flexDirection={{ md: "row", xs: "column-reverse" }}
      justifyContent={"space-between"}
      alignItems={{ md: "center", xs: "flex-start" }}
    >
      <Stack>
        <Typography
          fontSize={{ md: "25px", xs: "20px" }}
          p={0}
          component="h1"
          fontWeight="bold"
          textTransform={"capitalize"}
        >
          {item.name}
        </Typography>
        <Box pl={2}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography>Slug:</Typography>
            <Typography fontWeight={"bold"}>{item.slug}</Typography>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography>Created At:</Typography>
            <Typography fontWeight={"bold"}>
              {dayjs(item.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography>Created By:</Typography>
            <Tooltip title={item.createdBy}>
              <Typography fontWeight={"bold"} fontSize="14px">
                {item.createdBy.slice(0, 9)}...
              </Typography>
            </Tooltip>
          </Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography>Last Updated At:</Typography>
            <Typography fontWeight={"bold"}>
              {dayjs(item.updatedAt).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          {item.category&&<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Typography>Parent Category:</Typography>
            <Typography fontWeight={"bold"}>
              {item.category.categoryId.name}
            </Typography>
          </Stack>}
        </Box>
      </Stack>
      <Stack
        alignItems={{ md: "flex-end", xs: "center" }}
        width={{ md: "50%", xs: "100%" }}
      >
        <img
          src={item.image.secure_url}
          loading="lazy"
          style={{ width: "200px", height: "200px" }}
        />
      </Stack>
    </Stack>
  );
};

export default ItemDetailsHeader;
