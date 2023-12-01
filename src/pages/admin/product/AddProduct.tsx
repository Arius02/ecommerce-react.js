import {
  TextField,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import SnackbarComponent from "../../../components/common/SnackBar.tsx";

import {  useQuery } from "@tanstack/react-query";
import fetchData from "../../../utils/fetchData.ts";
import { addProductSchema } from "../../../validation/peoduct.validator.ts";
import useMutationHook from "../../../hooks/useMutationHook.tsx";
import { UploadImage, UploadMultipleImages } from "../../../components/admin/index.ts";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet";



const AddProduct = () => {
      const [snack, setSnack] = React.useState<SnackbarType>({
        open: false,
        message: "",
        severity: "success",
      });
     const {
       register,
       formState: { errors },
       setValue,
       handleSubmit,
       watch,
     } = useForm<AddProductType>({
       resolver: yupResolver(addProductSchema) as any,
     });
     const [imageUrl, setImageUrl] = React.useState("");
     const coverImage = watch("coverImage");
     React.useEffect(() => {
       if (coverImage?.length > 0) {
         setImageUrl(URL.createObjectURL(coverImage[0]));
       }

     }, [coverImage]);
   
     const { mutate: addProduct, isPending } = useMutationHook({
      url: "/product",
      method: "POST",
      message: "Product Added Successfully.",
       setSnack,
       }  );
     const { data: classifications, isPending: isClassificationsLoading } =
       useQuery({
         queryKey: ["getClassifications"],
         queryFn: () =>
           fetchData({
             url: "/category/classifications/list?isProduct=true",
             method: "GET",
           }),
         refetchOnWindowFocus: false,
       });
       const category= watch("categoryId") 
       const [allowedSubCategories, setAllowedSubCategories] = React.useState<any[]>([]);
       React.useEffect(()=>{
         if (category != "" && classifications) {
           setAllowedSubCategories(
             classifications?.data.classifications.find(
               (item: any) => item._id === category
           )?.subcategories)
        }
    },[category])
     const onSubmit = (data: AddProductType) => {
       const formData = new FormData();
for(const image of data.images){
  formData.append("images", image);
}
  formData.append("coverImage", data.coverImage[0]);
       const keys =["price","stock","name","desc","categoryId","subCategoryId","brandId","appliedDiscount"]
for (const key of keys) {
  formData.append(key, data[key]);
}
addProduct(formData)
     }
  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>{" "}
      <Paper sx={{ p: 5 }}>
        <Typography variant="h1" sx={{ fontSize: 25, fontWeight: "bold" }}>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2 }}
            sx={{ mt: 4 }}
            // gap{1}
          >
            <Grid md={6} xs={12}>
              <TextField
                label={`Name`}
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label={`Stock`}
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("stock")}
                error={!!errors.stock}
                helperText={errors.stock && errors.stock.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label={`Price`}
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price && errors.price.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label={`Applied Discount`}
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("appliedDiscount")}
                error={!!errors.appliedDiscount}
                helperText={
                  errors.appliedDiscount && errors.appliedDiscount.message
                }
              />
            </Grid>

            <Grid md={6} xs={12}>
              <UploadImage
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                errorName="coverImage"
                errors={errors}
                name="Product Image"
                register={register}
                setValue={setValue}
                key={"dijd"}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <UploadMultipleImages
                errors={errors}
                register={register}
                setValue={setValue}
                key={43866}
                setSnack={setSnack}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                label="Dscription"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                {...register("desc")}
              />
            </Grid>

            <Grid md={6} xs={12}>
              {classifications && (
                <FormControl fullWidth error={!!errors.categoryId}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    label="Category"
                    {...register("categoryId")}
                  >
                    {classifications.data.classifications?.map(
                      (category: any) => (
                        <MenuItem value={category.id} key={category.id}>
                          {category.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.categoryId && (
                    <FormHelperText>{errors.categoryId.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              {isClassificationsLoading && (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"40px"}
                  style={{ borderRadius: "5px" }}
                />
              )}
            </Grid>
            <Grid md={6} xs={12}>
              {classifications && (
                <FormControl fullWidth error={!!errors.subCategoryId}>
                  <InputLabel id="sub-category-select-label">
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="sub-category-select-label"
                    id="sub-category-select"
                    label="Sub Category"
                    {...register("subCategoryId")}
                  >
                    {allowedSubCategories &&
                      allowedSubCategories.map((subCategory: any) => (
                        <MenuItem value={subCategory.id} key={subCategory.id}>
                          {subCategory.name}
                        </MenuItem>
                      ))}
                    {allowedSubCategories &&
                      allowedSubCategories.length == 0 &&
                      category == "" && (
                        <MenuItem value={""} key={"no-category"}>
                          Choose Category First
                        </MenuItem>
                      )}
                    {allowedSubCategories &&
                      allowedSubCategories.length == 0 &&
                      category != "" && (
                        <MenuItem value={""} key={"no-sub-category"}>
                          No Sub Category Available
                        </MenuItem>
                      )}
                  </Select>
                  {errors.subCategoryId && (
                    <FormHelperText>
                      {errors.subCategoryId.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
              {isClassificationsLoading && (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"40px"}
                  style={{ borderRadius: "5px" }}
                />
              )}
            </Grid>
            <Grid md={6} xs={12}>
              {classifications && (
                <FormControl fullWidth error={!!errors.brandId}>
                  <InputLabel id="brand-select-label">brand</InputLabel>
                  <Select
                    labelId="brand-select-label"
                    id="brand-select"
                    label="brand"
                    {...register("brandId")}
                  >
                    {classifications.data?.brands?.map((brand: any) => (
                      <MenuItem value={brand.id} key={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.brandId && (
                    <FormHelperText>{errors.brandId.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              {isClassificationsLoading && (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"40px"}
                  style={{ borderRadius: "5px" }}
                />
              )}
            </Grid>
          </Grid>
          <LoadingButton
            type={"submit"}
            variant="contained"
            sx={{ mt: 4 }}
            loading={isPending}
          >
            Add Product
          </LoadingButton>
        </form>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Paper>
    </>
  );
};

export default AddProduct;
