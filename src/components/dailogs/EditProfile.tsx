import React, { useState } from "react";
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
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import SnackbarComponent from "../common/SnackBar";
import useMutationHook from "../../hooks/useMutationHook";
import { editProfileSchema } from "../../validation/auth.validator";
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
    resolver: yupResolver(editProfileSchema) as Resolver<EditProfileType>,
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
    const updatedData = getUpdatedFields(data, user);
    if (Object.keys(updatedData).length > 0) {
      mutate(updatedData);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogHeader />
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} p={3}>
            <Grid item md={6} xs={12}>
              <TextInputField
                label="Name"
                id="name"
                register={register("name")}
                error={errors.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextInputField
                label="Email"
                id="email"
                register={register("email")}
                error={errors.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SelectInputField
                label="Gender"
                id="gender"
                register={register("gender")}
                error={errors.gender}
                options={["Male", "Female"]}
                defaultValue={user?.gender}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePickerField
                label="Birth"
                control={control}
                name="birth"
                error={errors.birth}
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
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      )}
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </Dialog>
  );
};

export default EditProfile;

// Dialog Header Component
const DialogHeader = () => (
  <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={2}>
    <PersonIcon sx={{ color: pink[500] }} />
    <Typography fontWeight={"bold"} color={blueGrey[900]} variant="h5">
      Edit Profile
    </Typography>
  </Stack>
);

// Text Input Field Component
const TextInputField = ({
  label,
  id,
  register,
  error,
}: {
  label: string;
  id: string;
  register: any;
  error: any;
}) => (
  <TextField
    label={label}
    variant="outlined"
    id={id}
    fullWidth
    {...register}
    error={!!error}
    helperText={error?.message}
    color="secondary"
  />
);

// Select Input Field Component
const SelectInputField = ({
  label,
  id,
  register,
  error,
  options,
  defaultValue,
}: {
  label: string;
  id: string;
  register: any;
  error: any;
  options: string[];
  defaultValue: string;
}) => (
  <FormControl fullWidth error={!!error}>
    <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
    <Select labelId={`${id}-select-label`} id={id} label={label} {...register} defaultValue={defaultValue}>
      {options.map((option) => (
        <MenuItem value={option} key={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>{error?.message}</FormHelperText>
  </FormControl>
);

// Date Picker Field Component
const DatePickerField = ({
  label,
  control,
  name,
  error,
}: {
  label: string;
  control: any;
  name: string;
  error: any;
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControl fullWidth error={!!error}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={label}
            format="DD-MM-YYYY"
            onChange={(date) => field.onChange(date)}
          />
        </LocalizationProvider>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    )}
  />
);

// Utility Function to Get Updated Fields
const getUpdatedFields = (data: EditProfileType, user: any) => {
  const updatedData: any = {};
  const keys = ["name", "email", "gender"];
  if (dayjs(data.birth).format("DD/MM/YYYY") !== user.birth) {
    updatedData.birth = dayjs(data.birth).format("DD/MM/YYYY");
  }
  keys.forEach((key) => {
    if (data[key] !== user[key]) {
      updatedData[key] = data[key];
    }
  });
  return updatedData;
};
