import React, { useEffect, useState } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  DialogTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { cities, governorates } from "../../constants/Cities";
import { useForm } from "react-hook-form";
import useMutationHook from "../../hooks/useMutationHook";
import { addAddressSchema } from "../../validation/address..validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import SnackbarComponent from "../common/SnackBar";
import { LoadingButton } from "@mui/lab";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
};
const AddAddressDialog = ({ open, setOpen, refetch }: Props) => {
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAddressSchema),
  });

  const [allowedCities, setAllowedCities] = useState<
    {
      id: string;
      governorate_id: string;
      city_name_ar: string;
      city_name_en: string;
    }[]
  >([]);
  const governate = watch("governorate");
  useEffect(() => {
    console.log(governate);
    governate &&
      setAllowedCities(
        cities.data.filter((city: any) => city.governorate_id === (governate as any).id)
      );
  }, [governate]);
  const { mutate: addAddress, isPending } = useMutationHook({
    url: "/contactInfo",
    method: "POST",
    message: "Address Added Successfully.",
    refetch,
    setOpen,
    setSnack,
  });

  const onSubmit = (data: any) => {
    addAddress({ ...data, governorate: data.governorate.governorate_name_en });
    reset()
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Address</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack gap={2}>
              <FormControl fullWidth error={!!errors.governorate}>
                <InputLabel id="governorate-select-label">
                  Governorate
                </InputLabel>
                <Select
                  labelId="governorate-select-label"
                  id="governorate-select"
                  label="governorate"
                  {...register("governorate")}
                  sx={{ width: "350px" }}
                >
                  {governorates.data.map((governorate: any) => (
                    <MenuItem value={governorate} key={governorate.id}>
                      {governorate.governorate_name_en}
                    </MenuItem>
                  ))}
                </Select>
                {errors.governorate && (
                  <FormHelperText>{errors.governorate.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth error={!!errors.governorate}>
                <InputLabel id="governate-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  label="City"
                  {...register("city")}
                  // sx={{ width: "350px" }}
                >
                  {allowedCities.length > 0 &&
                    allowedCities.map((allowedCity: any) => (
                      <MenuItem
                        value={allowedCity.city_name_en}
                        key={allowedCity.id}
                      >
                        {allowedCity.city_name_en}
                      </MenuItem>
                    ))}
                </Select>
                {errors.city && (
                  <FormHelperText>{errors.city.message}</FormHelperText>
                )}
              </FormControl>
              <TextField
                label={"Street"}
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("street")}
                multiline
                rows={2}
                error={!!errors.street}
                helperText={errors.street && errors.street.message}
              />
              <TextField
                label={"Phone"}
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message}
              />
            </Stack>
          </DialogContent>
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
      </Dialog>
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default AddAddressDialog;
