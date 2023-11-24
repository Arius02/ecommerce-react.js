import {
  Box,
  Stack,
  Typography,
  TextField,
  Collapse,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useMutationHook from "../../hooks/useMutationHook";
import { ChangeEvent, useState } from "react";
import SnackbarComponent from "../SnackBar";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButtonProps } from "@mui/material/IconButton";
interface AddCouponExpendProps extends IconButtonProps {
  expand: boolean;
}
const AddCouponExpend = styled((props: AddCouponExpendProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
type Props = {
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  refetch?: any;
};

const AddCoupon = ({ couponCode, setCouponCode, refetch }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };
  const handleAddCoupon = () => {
    if (couponCode.length > 3 && couponCode.length < 40) {
      applyCoupon({ couponCode });
      setCouponCode("");
    }
  };
  const { mutate: applyCoupon, isPending } = useMutationHook({
    url: "/cart/applyCoupon",
    method: "PUT",
    refetch,
    message: "Coupon Added.",
    setSnack,
  });
  return (
    <>
      <Box>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight="bold" mb={2}>
            Add Coupon:
          </Typography>
          <AddCouponExpend
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="add coupon"
          >
            <ExpandMoreIcon />
          </AddCouponExpend>
        </Stack>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <TextField
            label="Coupon Code"
            sx={{ width: "100%" }}
            variant="outlined"
            id="couponCode"
            value={couponCode}
            onChange={handleChange}
          />
          {refetch && (
            <LoadingButton
              sx={{ width: "100%", my: 2 }}
              loading={isPending}
              color="secondary"
              variant="outlined"
              onClick={handleAddCoupon}
            >
              Add Coupon
            </LoadingButton>
          )}
        </Collapse>
      </Box>
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </>
  );
};

export default AddCoupon;
