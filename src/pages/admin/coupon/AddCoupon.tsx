import { TextField, Paper, Typography,   } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm, Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCouponSchema } from "../../../validation/coupon.validator.ts";
import * as React from "react";
import SnackbarComponent from "../../../components/common/SnackBar.tsx";
import useMutationHook from "../../../hooks/useMutationHook.tsx";
import { Helmet } from "react-helmet";

const AddCoupon = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<AddCouponType>({
    resolver: yupResolver(addCouponSchema) as any,
  });
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: addCoupon, isPending } = useMutationHook({
    url: "/coupon",
    method: "POST",
    message: "Coupon Added Successfully.",
    setSnack,
  });
  const onSubmit = (data: any) => {
   addCoupon({
     fromDate: new Date(data.fromDate).toISOString,
     toDate: new Date(data.toDate).toISOString,
     ...data,
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
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 4 }}
          >
            <Grid md={6} xs={12}>
              <TextField
                label="Coupon Code"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("couponCode")}
                error={!!errors.couponCode}
                helperText={errors.couponCode && errors.couponCode.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label="Usage Limit"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("usageLimit")}
                error={!!errors.usageLimit}
                helperText={errors.usageLimit ? errors.usageLimit.message : ""}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="couponType"
                control={control}
                defaultValue={"fixed_amount"}
                render={({ field }) => (
                  <FormControl error={!!errors.couponType}>
                    <FormLabel id="cpoupon-type">Coupon Type</FormLabel>
                    <RadioGroup row aria-labelledby="cpoupon-type" {...field}>
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
                    {errors.couponType && (
                      <FormHelperText>
                        {errors.couponType.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>{" "}
            <Grid md={6} xs={12}>
              <TextField
                label="Discount Value"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("discountValue")}
                error={!!errors.discountValue}
                helperText={
                  errors.discountValue && errors.discountValue.message
                }
              />
            </Grid>{" "}
            <Grid md={6} xs={12}>
              <Controller
                name="userRestrictions"
                control={control}
                defaultValue={"all"}
                render={({ field }) => (
                  <FormControl error={!!errors.userRestrictions}>
                    <FormLabel id="userRestrictions">
                      User Restrictions
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="userRestrictions"
                      {...field}
                    >
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
                    {errors.userRestrictions && (
                      <FormHelperText>
                        {errors.userRestrictions.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label="Min Purchase Amount"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("minPurchaseAmount")}
                error={!!errors.minPurchaseAmount}
                helperText={
                  errors.minPurchaseAmount && errors.minPurchaseAmount.message
                }
              />
            </Grid>{" "}
            <Grid md={6} xs={12}>
              <Controller
                name="fromDate"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                  return (
                    <FormControl
                      error={!!errors.fromDate}
                      sx={{ width: "100%" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            value={field.value}
                            onChange={(date) => {
                              console.log({ date });
                              field.onChange(date);
                            }}
                            label="Starting Date"
                            sx={{ width: "100%" }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {errors.fromDate && (
                        <FormHelperText>
                          {errors.fromDate.message as React.ReactNode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                }}
              />
            </Grid>{" "}
            <Grid md={6} xs={12}>
              <Controller
                name="toDate"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                  return (
                    <FormControl error={!!errors.toDate} sx={{ width: "100%" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            value={field.value}
                            onChange={(date) => {
                              field.onChange(date);
                            }}
                            label="Ending Date"
                            sx={{ width: "100%" }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {errors.toDate && (
                        <FormHelperText>
                          {errors.toDate.message as React.ReactNode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                }}
              />
            </Grid>{" "}
          </Grid>
          <LoadingButton
            type={"submit"}
            variant="contained"
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
