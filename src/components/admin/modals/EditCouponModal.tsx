/* eslint-disable @typescript-eslint/no-explicit-any */
import {  QueryObserverResult, RefetchOptions,  } from '@tanstack/react-query';
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import useMutationHook from "../../../hooks/useMutationHook";
import {  Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarComponent from "../../common/SnackBar";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editCouponSchema } from '../../../validation/coupon.validator';
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import style from '../../../utils/modalStyle';
type Props = {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: CouponListType;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

const EditCouponModal = ({ title, open, setOpen, item ,refetch }: Props) => {
   const {
     register,
     formState: { errors },
     control,
     handleSubmit,
   } = useForm<EditCouponType>({
     resolver: yupResolver(editCouponSchema) as any,
     defaultValues: {
       discountValue: item.discountValue,
       fromDate: dayjs(item.fromDate?.split("T")[0]),
       toDate: dayjs(item.toDate?.split("T")[0]),
       minPurchaseAmount: item.minPurchaseAmount,
       usageLimit: item.usageLimit,
     },
   });
 const [snack, setSnack] = React.useState<SnackbarType>({
   open: false,
   message: "",
   severity: "success",
 });
 const { mutate: editCoupon, isPending } = useMutationHook({
  url: `/coupon/${item._id}`,
  method: "PUT",
  message: "Coupon Updated Successfully.",
   setSnack,
   refetch
});
   const onSubmit = (data: any) => {
     const updatedData: any = {};
     const keys = Object.keys(data);
     const fromDate = dayjs(data.fromDate).format("YYYY-MM-DD");
    const toDate = dayjs(data.toDate).format("YYYY-MM-DD")
    for(const key of keys){
          if (key === "fromDate") {
            if (fromDate != item.fromDate.split("T")[0]) {
              updatedData[key] = data.fromDate;
            }
          }
          else if (key == "toDate") {
            if (toDate != item.toDate.split("T")[0]) {
              updatedData[key] = data.toDate;
            }
          }
        else if(data[key]!=item[key]){
        updatedData[key]=data[key]
      }
  
    }
    if(Object.keys(updatedData).length>0){
      editCoupon(updatedData);
    }
  }
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{...style, width:{md:"50%",sm:"75%",xs:"98%"}}}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mt: 4 }}
            >
              <Grid xs={12}>
                <TextField
                  label="Usage Limit"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  {...register("usageLimit")}
                  error={!!errors.usageLimit}
                  helperText={
                    errors.usageLimit ? errors.usageLimit.message : ""
                  }
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label={`Discount Value ${
                    item.couponType == "percentage" ? " % " : "( EGP )"
                  }`}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  {...register("discountValue")}
                  error={!!errors.discountValue}
                  helperText={
                    errors.discountValue && errors.discountValue.message
                  }
                />
              </Grid>{" "}
              <Grid xs={12}>
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
              {dayjs(item.fromDate).isAfter(dayjs()) ? (
                <Grid xs={12}>
                  <Controller
                    name="fromDate"
                    control={control}
                    defaultValue={null}
                    render={({ field,  }) => {
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
                </Grid>
              ):""}{" "}
              <Grid xs={12}>
                <Controller
                  name="toDate"
                  control={control}
                  defaultValue={null}
                  render={({ field,  }) => {
                    return (
                      <FormControl
                        error={!!errors.toDate}
                        sx={{ width: "100%" }}
                      >
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

            <Stack flexDirection="row" justifyContent="flex-end" mt={2}>
              <Button
                variant="text"
                onClick={() => setOpen(false)}
                color={"error"}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={isPending}
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
              >
                Update
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Modal>
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </>
  );
}

export default EditCouponModal