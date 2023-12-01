/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextField,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import UploadImage from "./UploadImage.tsx";
import { UseMutateFunction, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import SnackbarComponent from "../../common/SnackBar.tsx";
import fetchData from "../../../utils/fetchData.ts";
import { Helmet } from "react-helmet";

type Props = {
  schema: any;
  addItem: UseMutateFunction<AxiosResponse<any, any>, any, any, unknown>;
  snack: SnackbarType;
  setSnack: React.Dispatch<React.SetStateAction<SnackbarType>>;
  isPending:boolean;
  name:string;
  enabled?:boolean 
};

const AddItem = ({schema,addItem,snack,setSnack,isPending,name,enabled=false}: Props) => { 
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<AddItemType>({
    resolver: yupResolver(schema) as any,
  });
  const [imageUrl, setImageUrl] = React.useState("");
  const image = watch("image");
  React.useEffect(() => {
    if (image?.length > 0) {
      setImageUrl(URL.createObjectURL(image[0]));
    }
  }, [image]);
      const onSubmit = (data: AddItemType) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image[0]);
   data.categoryId&& formData.append("categoryId", data.categoryId);

        addItem(formData)
      };
      const { data: classifications, isPending: isClassificationsLoading } =
        useQuery({
          queryKey: ["getClassifications"],
          queryFn: () =>
            fetchData({
              url: "/category/classifications/list",
              method: "GET",
            }),
          enabled,
          refetchOnWindowFocus: false,
        });
  return (
    <>
      <Helmet>
        <title>Add {name}</title>
      </Helmet>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h1" sx={{ fontSize: 25, fontWeight: "bold" }}>
          Add {name}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2 }}
            sx={{ mt: 4 }}
            rowGap={3}
          >
            <Grid md={enabled ? 6 : 12} xs={12}>
              <TextField
                label={`${name} Name`}
                variant="outlined"
                sx={{ width: "100%", mb: 4 }}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              {classifications && enabled && (
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    label="Category"
                    {...register("categoryId")}
                  >
                    {classifications.data.classifications.map(
                      (category: any) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
              {isClassificationsLoading && enabled && (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"40px"}
                  style={{ borderRadius: "5px" }}
                />
              )}
            </Grid>
            <Grid xs={12}>
              <UploadImage
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                errorName="image"
                errors={errors}
                name={name}
                register={register}
                setValue={setValue}
                key={43866}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type={"submit"}
            variant="contained"
            sx={{ mt: 4 }}
            loading={isPending}
          >
            Add {name}
          </LoadingButton>
        </form>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Paper>
    </>
  );
};

export default AddItem;
