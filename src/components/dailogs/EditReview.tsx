import {
  Typography,
  Rating,
  TextField,
  Dialog,
  Stack,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useMutationHook from "../../hooks/useMutationHook";
import { LoadingButton } from "@mui/lab";
import SnackbarComponent from "../common/SnackBar";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type Props = {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  data: any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const EditReview = ({ refetch, data, open, setOpen }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddReviewType>();
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: editReview, isPending } = useMutationHook({
    url: "/review",
    method: "PUT",
    message: "Review Edited Successfully.",
    setSnack,
    refetch,
    setOpen,
  });
  const onSubmit = (dataToSend: any) => {
    const updatedData: any = {};
    for (const key of Object.keys(dataToSend)) {
      if (data[key] != dataToSend[key]) {
        updatedData[key] = dataToSend[key];
      }
    }
    updatedData.reviewId = data._id;
    editReview({ ...updatedData });
  };

  useEffect(() => {
    reset({
      rating: data.rating,
      reviewDisc: data.reviewDisc,
    });
  }, [data]);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "15px" }}>
        <Typography fontWeight="bold" fontSize={{ md: "30px", xs: "22px" }}>
          Edity Your Review
        </Typography>
        <Typography fontWeight="bold" mb={1}>
          Your Rating:
        </Typography>
        <Controller
          name="rating"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Rating
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              name="rating"
            />
          )}
        />
        <TextField
          label="Review Dscription"
          multiline
          rows={6}
          sx={{ width: "100%", mt: 4, mb: 2 }}
          {...register("reviewDisc")}
          error={!!errors.reviewDisc}
          helperText={errors.reviewDisc && errors.reviewDisc.message}
        />
        <Stack flexDirection="row" width="fit-content" mt={2} ml="auto" gap={1}>
          <Button onClick={() => setOpen(false)}>cancel</Button>

          <LoadingButton
            loading={isPending}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </LoadingButton>
        </Stack>
      </form>
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </Dialog>
  );
};

export default EditReview;
