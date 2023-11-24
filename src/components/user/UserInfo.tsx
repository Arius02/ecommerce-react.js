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
  });

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
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              bgcolor={pink[600]}
            >
              1
            </Stack>
            <Typography fontSize={{ md: "24px", xs: "18px" }}>
              Delivery Details
            </Typography>
          </Stack>
          {user?.deliveryDetails.length != 3 && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setAddAddresOpen(true)}
            >
              Add new Address
            </Button>
          )}
        </Stack>
        <Grid container mt={2}>
          {user &&
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
                    cursor:"pointer"
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
