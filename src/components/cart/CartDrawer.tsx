import React, { Dispatch, SetStateAction } from 'react'
import { Drawer, Stack, IconButton } from "@mui/material";
import CloseIcon  from "@mui/icons-material/Close"
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { blueGrey } from '@mui/material/colors';
type Props = {
  setCartDrawerOpen: Dispatch<SetStateAction<boolean>>;
  cartDrawerOpen: boolean;
};
const CartDrawer = ({setCartDrawerOpen,
cartDrawerOpen}: Props) => {
console.log(cartDrawerOpen);
  return (
    <React.Fragment key={"right"}>
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { md: "30%", sm: "50%", xs: "100%" },
            bgcolor: "white",
            height: "100%",
            p: 2,
          },
        }}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"row"} gap={1} fontWeight={"bold"}>
            <LocalMallIcon sx={{ color: blueGrey[700], fontSize:25 }} />0 Items
          </Stack>
          <IconButton type="button" sx={{ p: "14px" }} aria-label="close-cart" onClick={()=>setCartDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
}

export default CartDrawer