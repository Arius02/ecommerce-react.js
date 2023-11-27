import {
  Stack,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  FormControl,
  FormHelperText,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { pink, blueGrey } from "@mui/material/colors";
import { useForm, Controller } from "react-hook-form";
import { editProfileSchema } from "../../validation/auth.validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import useMutationHook from "../../hooks/useMutationHook";
import React, { useState } from "react";
import SnackbarComponent from "../common/SnackBar";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
type Props = {
  user: any;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const EditProfile = ({ user, refetch, setOpen, open }: Props) => {
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<EditProfileType>({
    resolver: yupResolver(editProfileSchema) as any,
    defaultValues: {
      name: user?.name,
      email: user?.email,
      gender: user?.gender,
      birth: dayjs(user?.birth),
    },
  });
  const { mutate, isPending } = useMutationHook({
    url: "/auth",
    method: "PUT",
    refetch,
    setSnack,
    message: "Profile Updated.",
    setOpen,
  });
  const onSubmit = (data: EditProfileType) => {
    const updatedData: any = {};
    const keys = ["name", "email", "gender"];
    if (dayjs(data.birth).format("DD/MM/YYYY") != user.birth) {
      updatedData.birth = dayjs(data.birth).format("DD/MM/YYYY");
    }
    for (const key of keys) {
      if (data[key] !== user[key]) {
        updatedData[key] = data[key];
      }
    }

    if (Object.keys(updatedData).length > 0) {
      mutate(updatedData);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={2}>
          <PersonIcon sx={{ color: pink[500] }} />
          <Typography fontWeight={"bold"} color={blueGrey[900]} variant="h5">
            Edit Profile
          </Typography>
        </Stack>
        {user && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container px={3} rowGap={2}>
              <Grid item md={6} xs={12} px={2}>
                <TextField
                  label="Name"
                  variant="outlined"
                  id="name"
                  sx={{ width: "100%" }}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                  color="secondary"
                />{" "}
              </Grid>
              <Grid item md={6} xs={12} px={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  id="email"
                  sx={{ width: "100%" }}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  color="secondary"
                />{" "}
              </Grid>
              <Grid item md={6} xs={12} mt={{ md: 1, xs: 0 }} px={2}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">Gender</InputLabel>
                  <Select
                    labelId="Gender-select-label"
                    id="Gender-select"
                    label="Gender"
                    {...register("gender")}
                    defaultValue={user?.gender}
                  >
                    {["Male", "Female"].map((gender: any) => (
                      <MenuItem value={gender} key={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} px={2}>
                <Controller
                  name="birth"
                  control={control}
                  defaultValue={dayjs(user?.birth)}
                  render={({ field }) => {
                    return (
                      <FormControl
                        error={!!errors.birth}
                        sx={{ width: "100%" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              value={field.value}
                              onChange={(date) => {
                                field.onChange(date);
                              }}
                              label="Birth"
                              sx={{ width: "100%" }}
                              format="DD-MM-YYYY"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        {errors.birth && (
                          <FormHelperText>
                            {errors.birth.message as React.ReactNode}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  }}
                />
              </Grid>
            </Grid>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <LoadingButton
                type="submit"
                variant="contained"
                color="secondary"
                loading={isPending}
              >
                Add
              </LoadingButton>
            </DialogActions>
          </form>
        )}
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Dialog>
    </React.Fragment>
  );
};

export default EditProfile;
