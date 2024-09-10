import { useState } from "react";
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from "react-helmet";

import { addCouponSchema } from "../../../validation/coupon.validator";
import SnackbarComponent from "../../../components/common/SnackBar";
import useMutationHook from "../../../hooks/useMutationHook";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(addCouponSchema),
  });

  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/dashboard/coupon");
    }, 500);
  };
  const { mutate: addCoupon, isPending } = useMutationHook({
    url: "/coupon",
    method: "POST",
    message: "Coupon Added Successfully.",
    setSnack,
    handleNavigate,
  });

  const onSubmit = (data: any) => {
    addCoupon({
      ...data,
      fromDate: new Date(data.fromDate).toISOString(),
      toDate: new Date(data.toDate).toISOString(),
    });
  };

  return (
    <>
      <Helmet>
        <title>Add Coupon</title>
      </Helmet>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h1" sx={{ fontSize: 25, fontWeight: "bold" }}>
          Add Coupon
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 4 }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                label="Coupon Code"
                fullWidth
                variant="outlined"
                {...register("couponCode")}
                error={!!errors.couponCode}
                helperText={errors.couponCode?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Usage Limit"
                fullWidth
                variant="outlined"
                {...register("usageLimit")}
                error={!!errors.usageLimit}
                helperText={errors.usageLimit?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="couponType"
                control={control}
                defaultValue="fixed_amount"
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.couponType}>
                    <FormLabel component="legend">Coupon Type</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="fixed_amount"
                        control={<Radio />}
                        label="Fixed Amount"
                      />
                      <FormControlLabel
                        value="percentage"
                        control={<Radio />}
                        label="Percentage"
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {errors.couponType?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Discount Value"
                fullWidth
                variant="outlined"
                {...register("discountValue")}
                error={!!errors.discountValue}
                helperText={errors.discountValue?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="userRestrictions"
                control={control}
                defaultValue="all"
                render={({ field }) => (
                  <FormControl
                    component="fieldset"
                    error={!!errors.userRestrictions}
                  >
                    <FormLabel component="legend">User Restrictions</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="All"
                      />
                      <FormControlLabel
                        value="vip_members"
                        control={<Radio />}
                        label="VIP Members"
                      />
                      <FormControlLabel
                        value="existing_customers"
                        control={<Radio />}
                        label="Loyal Customers"
                      />
                      <FormControlLabel
                        value="first_time_shoppers"
                        control={<Radio />}
                        label="First Time Shoppers"
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {errors.userRestrictions?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Min Purchase Amount"
                fullWidth
                variant="outlined"
                {...register("minPurchaseAmount")}
                error={!!errors.minPurchaseAmount}
                helperText={errors.minPurchaseAmount?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="fromDate"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <FormControl error={!!errors.fromDate} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Starting Date"
                        value={field.value}
                        onChange={field.onChange}
                        format="dd/MM/yyyy"
                      />
                    </LocalizationProvider>
                    <FormHelperText>{errors.fromDate?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="toDate"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <FormControl error={!!errors.toDate} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Starting Date"
                        value={field.value}
                        onChange={field.onChange}
                        format="dd/MM/yyyy"
                      />
                    </LocalizationProvider>
                    <FormHelperText>{errors.toDate?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            loading={isPending}
          >
            Add Coupon
          </LoadingButton>
        </form>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Paper>
    </>
  );
};

export default AddCoupon;
