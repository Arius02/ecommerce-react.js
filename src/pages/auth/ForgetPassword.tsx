import React from "react";
import {
  Container,
  Stack,
  Typography,
  Paper,
  TextField,
  Link,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { blueGrey, grey } from "@mui/material/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../../validation/auth.validator";
import { Link as RouterLink } from "react-router-dom";
import SnackbarComponent from "../../components/common/SnackBar";
import useMutationHook from "../../hooks/useMutationHook";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginType>({
    resolver: yupResolver(forgetPasswordSchema) as any,
  });
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data,
    mutate: sendEmail,
    isPending,
  } = useMutationHook({
    url: "/auth/forgetPassword",
    method: "PATCH",
    message: "Logged In Successfully.",
    setSnack,
    // handleNavigate,
  });
  const onSubmit = (data: LoginType) => {
    sendEmail(data);
  };

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>{" "}
      <Stack bgcolor={grey[100]} justifyContent="center" minHeight={"100vh"}>
        <Container maxWidth="sm">
          <Paper sx={{ py: 3, px: { md: 7, xs: 2 } }}>
            {!data && (
              <>
                <Typography
                  fontWeight={"bold"}
                  textAlign={"center"}
                  variant="h5"
                >
                  Reset Your Password
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack mt={2} gap={2}>
                    <TextField
                      label="Email"
                      sx={{ width: "100%" }}
                      variant="outlined"
                      id="email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email && errors.email.message}
                      color="secondary"
                    />
                    <LoadingButton
                      loading={isPending}
                      color="secondary"
                      type="submit"
                      variant="contained"
                      sx={{ fontWeight: "bold", py: 1.5, mt: 1 }}
                    >
                      Send Email
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
              </>
            )}
            {data && data.data.message == "Done" && (
              <>
                <Typography
                  fontWeight={"bold"}
                  textAlign={"center"}
                  variant="h3"
                >
                  Done
                </Typography>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent="center"
                  gap={1}
                  mt={2}
                >
                  <Typography textAlign={"center"} variant="subtitle1">
                    Please check your email to reset your password{" "}
                  </Typography>{" "}
                  <Button
                    onClick={() => sendEmail({ email: getValues("email") })}
                  >
                    Resend
                  </Button>
                </Stack>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent="center"
                  gap={1}
                  mt={2}
                >
                  <Typography color="grey">Return to login? </Typography>
                  <Link
                    component={RouterLink}
                    color={blueGrey[900]}
                    fontWeight={"bold"}
                    to="/auth/login"
                  >
                    Login
                  </Link>
                </Stack>
              </>
            )}
          </Paper>
        </Container>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Stack>
    </>
  );
};

export default ForgetPassword;
