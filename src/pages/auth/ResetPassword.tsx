import React from "react";
import {
  Container,
  Stack,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { blueGrey, grey } from "@mui/material/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
} from "../../validation/auth.validator";
import { Link as RouterLink, useNavigate,  useSearchParams } from "react-router-dom";
import SnackbarComponent from "../../components/common/SnackBar";
import useMutationHook from "../../hooks/useMutationHook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const navigate = useNavigate();
const [searchParams,] = useSearchParams();
const token=searchParams.get("token")||""
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm< ResetPasswordType>({
    resolver: yupResolver(resetPasswordSchema) as any,
  });
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleNavigate = () => {
    navigate("/auth/login");
  };
  const {
    mutate: resetPassword,
    isPending,
  } = useMutationHook({
    url: `/auth/reset/${token}`,
    method: "PATCH",
    message: "Password reseted Successfully.",
    setSnack,
    handleNavigate,
  });
  const onSubmit = (data: ResetPasswordType) => {
    resetPassword(data);
  };
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>{" "}
      <Stack bgcolor={grey[100]} justifyContent="center" minHeight={"100vh"}>
        <Container maxWidth="sm">
          <Paper sx={{ py: 3, px: { md: 7, xs: 2 } }}>
            <Typography fontWeight={"bold"} textAlign={"center"} variant="h5">
              Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack mt={2} gap={2}>
                <FormControl
                  sx={{ width: "100%" }}
                  error={!!errors.newPassword}
                >
                  <FormLabel
                    htmlFor="password"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
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
                    {...register("newPassword")}
                    error={!!errors.newPassword}
                    color="secondary"
                  />
                  {errors.newPassword && (
                    <FormHelperText>
                      {errors.newPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel
                    htmlFor="rePassword"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Confirm Password
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    id="rePassword"
                    type="password"
                    {...register("rePassword")}
                    error={!!errors.rePassword}
                    helperText={errors.rePassword && errors.rePassword.message}
                    color="secondary"
                  />{" "}
                </FormControl>
                <LoadingButton
                  loading={isPending}
                  color="secondary"
                  type="submit"
                  variant="contained"
                  sx={{ fontWeight: "bold", py: 1.5, mt: 1 }}
                >
                  Reset Password
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
              </Stack>
            </form>
          </Paper>
        </Container>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Stack>
    </>
  );
};

export default ResetPassword;
