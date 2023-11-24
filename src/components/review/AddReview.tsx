import { Typography,Rating, TextField, Button} from "@mui/material"
import { Controller, useForm } from 'react-hook-form'

const AddReview = () => {
    const {register,handleSubmit,control, formState:{errors}}= useForm<AddReviewType>() 
    const onSubmit=()=>{

    }
  return (
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
        // defaultValue={3}
        rules={{ required: true }}
        render={() => <Rating name="rating" />}
      />
      <TextField
        label="Review Dscription"
        multiline
        rows={6}
        sx={{ width: "100%", mt: 4,mb:2 }}
        {...register("reviewDisc")}
        error={!!errors.reviewDisc}
        helperText={errors.reviewDisc && errors.reviewDisc.message}
      />
      <Button type="submit" variant="contained" color="secondary" >Submit</Button>
    </form>
  );
}

export default AddReview