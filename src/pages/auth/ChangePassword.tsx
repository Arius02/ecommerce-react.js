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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { grey } from "@mui/material/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../validation/auth.validator";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../../components/common/SnackBar";
import useMutationHook from "../../hooks/useMutationHook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordType>({
    resolver: yupResolver(changePasswordSchema) as any,
  });
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: changePassword, isPending } = useMutationHook({
    url: `/auth/changePassword`,
    method: "PATCH",
    message: "Password Changed Successfully.",
    setSnack,
    handleNavigate,
  });
  const onSubmit = (data: ChangePasswordType) => {
    changePassword(data);
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
        <title>Change Password</title>
      </Helmet>{" "}
      <Stack bgcolor={grey[100]} justifyContent="center" minHeight={"100vh"}>
        <Container maxWidth="sm">
          <Paper sx={{ py: 3, px: { md: 7, xs: 2 } }}>
            <Typography fontWeight={"bold"} textAlign={"center"} variant="h5">
              Change Your Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack mt={2} gap={2}>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel
                    htmlFor="oldPassword"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Old Password
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    id="oldPassword"
                    type="password"
                    {...register("oldPassword")}
                    error={!!errors.oldPassword}
                    helperText={
                      errors.oldPassword && errors.oldPassword.message
                    }
                    color="secondary"
                  />{" "}
                </FormControl>
                <FormControl
                  sx={{ width: "100%" }}
                  error={!!errors.newPassword}
                >
                  <FormLabel
                    htmlFor="password"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    New Password
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
              </Stack>
            </form>
          </Paper>
        </Container>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Stack>
    </>
  );
};

export default ChangePassword;
