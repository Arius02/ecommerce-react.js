import { Typography, Rating, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useMutationHook from "../../hooks/useMutationHook";
import { LoadingButton } from "@mui/lab";
import SnackbarComponent from "../common/SnackBar";
import { useContext, useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import useQueryHook from "../../hooks/useQueryHook";
import { AppContext } from "../../context/AppContext";

type Props = {
  productId: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
};
const AddReview = ({ productId, refetch }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddReviewType>();
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: addReview, isPending } = useMutationHook({
    url: "/review",
    method: "POST",
    message: "Review Added",
    setSnack,
    refetch,
  });
  const {auth}=useContext(AppContext)
  const { data: isAllow } = useQueryHook({
    url: "/review/allow",
    query: "getAllownce",
    selectedProp: "isAllowToRev",
    options:{
      enabled:auth._id?true:false
    }
  });
  const onSubmit = (data: any) => {
    addReview({ ...data, productId });
  };

  return (
    isAllow ? (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            fontWeight="bold"
            fontSize={{ md: "30px", xs: "22px" }}
            my={2}
          >
            Write a Review for this product
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
          <LoadingButton
            loading={isPending}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </LoadingButton>
        </form>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </>
    ):""
  );
};

export default AddReview;
