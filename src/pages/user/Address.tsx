import {
  Box,
  Stack,
  Typography,
  IconButton,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import { pink, blueGrey } from "@mui/material/colors";
import useQueryHook from "../../hooks/useQueryHook";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../../components/admin/modals/DeleteModal";
import AddAddressDialog from "../../components/dailogs/AddAddressDialog";
import AddressesSkeleton from "../../components/skeleton/user/AddressesSkeleton";

const Address = () => {
  const [addAddresOpen, setAddAddresOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const {
    data: user,
    isPending,
    refetch,
  } = useQueryHook({
    url: "/auth",
    query: "getUser",
    selectedProp: "user",
  });

  return (
    <>
      {user && (
        <>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <LocationOnIcon sx={{ color: pink[500] }} />
              <Typography
                fontWeight={"bold"}
                color={blueGrey[900]}
                fontSize={"24px"}
              >
                My Addresses
              </Typography>
            </Stack>
            {user.deliveryDetails.length < 3 && (
              <Button
                onClick={() => setAddAddresOpen(true)}
                variant="outlined"
                color="secondary"
              >
                Add Address
              </Button>
            )}
          </Stack>
          <Box mt={2}>
            {user.deliveryDetails &&
              user.deliveryDetails.map((address: any) => (
                <Paper
                  key={address._id}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={1}
                    width={{ sm: "48%", xs: "100%" }}
                    justifyContent={"space-between"}
                  >
                    <Typography>{address.governorate}</Typography>
                    <Tooltip title={`${address.city},${address.street}`}>
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: { md: "300px", xs: "150px" },
                        }}
                      >
                        {address.city},{address.street}
                      </Typography>
                    </Tooltip>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={1}
                    width={{ sm: "45%", xs: "100%" }}
                    justifyContent={"space-between"}
                  >
                    <Typography>{address.phone}</Typography>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                      <Tooltip title="soon">
                        <IconButton
                          onClick={() => {
                            // setIdToDelete(info._id);
                            // setDeleteOpen(true);
                          }}
                        >
                          <EditIcon sx={{ fontSize: "20px", color: "grey" }} />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        onClick={() => {
                          setIdToDelete(address._id);
                          setDeleteOpen(true);
                        }}
                      >
                        <DeleteOutlineIcon
                          sx={{ fontSize: "20px", color: "grey" }}
                        />
                      </IconButton>{" "}
                    </Stack>
                  </Stack>
                </Paper>
              ))}
          </Box>
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
      )}{" "}
      {isPending && <AddressesSkeleton />}
    </>
  );
};

export default Address;
