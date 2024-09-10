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
import { yupResolver } from "@hookform/resolvers/yup";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import SnackbarComponent from "../common/SnackBar";
import { LoadingButton } from "@mui/lab";
import { addAddressSchema } from "../../validation/address..validator";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
};

type CityType = {
  id: string;
  governorate_id: string;
  city_name_ar: string;
  city_name_en: string;
};

const AddAddressDialog = ({ open, setOpen, refetch }: Props) => {
  const [snack, setSnack] = useState({
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

  const [allowedCities, setAllowedCities] = useState<CityType[]>([]);
  const selectedGovernorate = watch("governorate");

  useEffect(() => {
    if (selectedGovernorate) {
      const filteredCities = cities.data.filter(
        // @ts-ignore
        (city: CityType) => city.governorate_id === selectedGovernorate.id
      );
      setAllowedCities(filteredCities);
    }
  }, [selectedGovernorate]);

  const { mutate: addAddress, isPending } = useMutationHook({
    url: "/contactInfo",
    method: "POST",
    message: "Address Added Successfully.",
    refetch,
    setOpen,
    setSnack,
  });

  const onSubmit = (data: any) => {
    const addressData = {
      ...data,
      governorate: data.governorate.governorate_name_en,
    };
    addAddress(addressData);
    reset();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{minWidth: "450px"}}>Add Address</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack gap={2}>
              <FormControl fullWidth error={!!errors.governorate}>
                <InputLabel id="governorate-select-label" >
                  Governorate
                </InputLabel>
                <Select
                  labelId="governorate-select-label"
                  id="governorate-select"
                  label="Governorate"
                  {...register("governorate")}
                >
                  {governorates.data.map((governorate: any) => (
                    <MenuItem value={governorate} key={governorate.id}>
                      {governorate.governorate_name_en}
                    </MenuItem>
                  ))}
                </Select>
                {errors.governorate && (
                  <FormHelperText>
                    {errors?.governorate?.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.city}>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  label="City"
                  {...register("city")}
                >
                  {allowedCities.length > 0 ? (
                    allowedCities.map((city: CityType) => (
                      <MenuItem value={city.city_name_en} key={city.id}>
                        {city.city_name_en}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No cities available</MenuItem>
                  )}
                </Select>
                {errors.city && (
                  <FormHelperText>{errors.city.message}</FormHelperText>
                )}
              </FormControl>

              <TextField
                label="Street"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                {...register("street")}
                error={!!errors.street}
                helperText={errors.street && errors.street.message}
              />

              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                {...register("phone")}
                error={!!errors.phone}
                helperText={
                  (errors.phone && errors.phone.message) 
                }
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
