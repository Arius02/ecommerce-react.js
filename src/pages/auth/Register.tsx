import React from 'react'
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
  Box,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../assets/logo2.svg"
import { blueGrey, grey } from '@mui/material/colors';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm,  } from "react-hook-form";
import { registerSchema } from '../../validation/auth.validator';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuthMutationHook from '../../hooks/useAuthMutationHook';
import SnackbarComponent from '../../components/common/SnackBar';
import { Helmet } from "react-helmet";



const Register = () => {
      const [showPassword, setShowPassword] = React.useState(false);
      const handleClickShowPassword = () => setShowPassword((show) => !show);

      const handleMouseDownPassword = (
   event: React.MouseEvent<HTMLButtonElement>
 ) => {
   event.preventDefault();
 };
 const navigate= useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RgisterType>({
    resolver: yupResolver(registerSchema) as any,
  });
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleNavigate=()=>{
    navigate("/auth/login")
  }
   const { mutate: createAccount, isPending } = useAuthMutationHook({
     url: "/auth/signup",
     method: "POST",
     message: "Account Created Successfully.",
     setSnack,
     handleNavigate,
   });
  const onSubmit=(data:RgisterType)=>{
    createAccount(data);
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Box bgcolor={grey[100]}>
        <Container maxWidth="sm">
          <Paper sx={{ py: 3, px: { md: 7, xs: 2 } }}>
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
                  <FormLabel htmlFor="name" sx={{ fontWeight: "bold", mb: 1 }}>
                    Name
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    id="name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name && errors.name.message}
                    color="secondary"
                  />{" "}
                </FormControl>
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
                    {...register("password")}
                    error={!!errors.password}
                    color="secondary"
                  />
                  {errors.password && (
                    <FormHelperText>{errors.password.message}</FormHelperText>
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
                  Create Acount
                </LoadingButton>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent="center"
                  gap={1}
                >
                  <Typography color="grey">
                    Already have an account?{" "}
                  </Typography>
                  <Link
                    component={RouterLink}
                    color={blueGrey[900]}
                    fontWeight={"bold"}
                    to="/auth/login"
                  >
                    Login
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Paper>
        </Container>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Box>
    </>
  );
}

export default Register