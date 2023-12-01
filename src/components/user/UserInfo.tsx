import React from "react";
import {
  Paper,
  Stack,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { pink, grey, blueGrey } from "@mui/material/colors";
import useQueryHook from "../../hooks/useQueryHook";
import AddAddressDialog from "../dailogs/AddAddressDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useMutationHook from "../../hooks/useMutationHook";
import { DeleteModal } from "../admin";

const UserInfo = () => {
  const [addAddresOpen, setAddAddresOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState("");
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const {
    data: user,
    refetch,
  } = useQueryHook({
    url: "/auth",
    query: "getInfo",
    selectedProp: "user",
  })as {
    data:any,
    refetch:any
  };

  const { mutate: selectedAddres } =
    useMutationHook({
      url: `/contactInfo/`,
      method: "PATCH",
      refetch,
    });

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: { md: "40px", xs: "25px" },
                height: { md: "40px", xs: "25px" },
                borderRadius: "50%",
                color: "white",
                fontWeight: "bold",
                fontSize: { md: "20px", xs: "14px" },
              }}
              bgcolor={pink[600]}
            >
              1
            </Stack>
            <Typography variant="h6">Delivery Details</Typography>
          </Stack>
          {user?.deliveryDetails.length != 3 && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setAddAddresOpen(true)}
              sx={{
                fontSize: { md: "14px", xs: "10px" },
              }}
            >
              Add new Address
            </Button>
          )}
        </Stack>
        <Grid container mt={2}>
          {user?.deliveryDetails &&
            user.deliveryDetails.map((info: any, index: number) => (
              <Grid item md={4} xs={12} key={info._id} p={2}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: grey[100],
                    borderRadius: "8px",
                    height: "180px",

                    border: info.isSelected ? 1 : 0,
                    borderColor: pink[500],
                    cursor: "pointer",
                  }}
                  onClick={() => selectedAddres({ id: info._id })}
                >
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                      bgcolor={pink[600]}
                    >
                      {index + 1}
                    </Stack>

                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setIdToDelete(info._id);
                        setDeleteOpen(true);
                      }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </Stack>
                  {info.governorate.length +
                    info.street.length +
                    info.city.length >
                  40 ? (
                    <Tooltip
                      title={`${info.street}, ${info.city}, ${info.governorate}.`}
                    >
                      <Typography color="grey" mt={2}>
                        <span style={{ color: blueGrey[800] }}>Address: </span>{" "}
                        {info.street.slice(0, 20)}..., {info.city},
                        {info.governorate}.
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography color="grey" mt={2}>
                      <span style={{ color: blueGrey[800] }}>Address: </span>{" "}
                      {info.street}, {info.city}, {info.governorate}.
                    </Typography>
                  )}
                  <Typography color="grey" mt={2}>
                    <span style={{ color: blueGrey[800] }}>Phone: </span>{" "}
                    {info.phone}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
          {user?.deliveryDetails?.length == 0 && (
            <Typography
              fontWeight={"bold"}
              color={"grey"}
              textAlign={"center"}
              my={5}
            >
              There are no addresses have been added yet
            </Typography>
          )}
      </Paper>
      <AddAddressDialog
        open={addAddresOpen}
        setOpen={setAddAddresOpen}
        refetch={refetch}
      />
      <DeleteModal
        url={`/contactInfo/${idToDelete}`}
        name="Address"
        open={deleteOpen}
        setOpen={setDeleteOpen}
        refetch={refetch}
        title="Detete Address"
      />
    </>
  );
};

export default UserInfo;
