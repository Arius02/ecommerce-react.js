import React, {  useEffect } from "react";
import {
  Stack,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  Box,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../assets/logo2.svg";
import { blueGrey, grey } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validation/auth.validator";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import SnackbarComponent from "./common/SnackBar";
import useAuthMutationHook from "../hooks/useAuthMutationHook";
import decode from "../utils/decode";
import useCartQueryHook from "../hooks/useCartQueryHook";
import useCartMutationHook from "../hooks/useCartMutationHook";

type Props = {
  to?: string;
};
const Login = ({ to }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema) as any,
  });
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const location = useLocation();
  const handleNavigate = () => {
    const from = location.state?.from?.pathname || "/";
    if (to) {
        navigate(to);
     
    } else {
        navigate(from, { replace: true });
    }
  };
  const {
    data,
    mutate: login,
    isPending,
  } = useAuthMutationHook({
    url: "/auth/signin",
    method: "POST",
    message: "Logged In Successfully.",
    setSnack,
    handleNavigate,
  });
  const onSubmit = (data: LoginType) => {
    login(data);
  };

  // get cart to marge it if there is guest cart
  const { data: cart, refetch } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const { mutate: mergeCart } = useCartMutationHook({
    url: `/cart/merge`,
    method: "PUT",
    refetch,
  });
  useEffect(() => {
    if (data?.data.token) {
      const { _id: userId } = decode(data.data.token);
      if (cart && localStorage.getItem("cartId") ) {
        mergeCart({
          userId,
          cartId: cart._id,
        });
      }
    }
  }, [data]);
  return (
    <Box
      bgcolor={to ? "transparent" : grey[100]}
      p={to ? 0 : 3}
      height={{ md: "100vh", xs: to ? "auto" : "100vh" }}
    >
      <Stack alignItems={"center"} gap={3}>
        <img src={logo} style={{ width: "100px" }} loading="lazy" />
        <Typography
          color={blueGrey[900]}
          fontWeight={"bold"}
          component={"h1"}
          variant="h6"
        >
          Welcome To Bazar
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack mt={5} gap={2}>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: "bold", mb: 1 }}>
              Email address
            </FormLabel>
            <TextField
              variant="outlined"
              id="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              color="secondary"
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }} error={!!errors.password}>
            <FormLabel htmlFor="password" sx={{ fontWeight: "bold", mb: 1 }}>
              password
            </FormLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password")}
              error={!!errors.password}
              color="secondary"
            />
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>

          <LoadingButton
            loading={isPending}
            color="secondary"
            type="submit"
            variant="contained"
            sx={{ fontWeight: "bold", py: 1.5, mt: 1 }}
          >
            Login
          </LoadingButton>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent="center"
            gap={1}
          >
            <Typography color="grey">Don't have account? </Typography>
            <Link
              component={RouterLink}
              color={blueGrey[900]}
              fontWeight={"bold"}
              to="/auth/register"
            >
              Register
            </Link>
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent="center"
            gap={1}
            bgcolor={grey[100]}
            py={1.5}
          >
            <Typography color="grey"> Forgot your password?</Typography>
            <Link
              component={RouterLink}
              color={blueGrey[900]}
              fontWeight={"bold"}
              to="/auth/forget-passwrod"
            >
              Reset It
            </Link>
          </Stack>
        </Stack>
      </form>

      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </Box>
  );
};

export default Login;
