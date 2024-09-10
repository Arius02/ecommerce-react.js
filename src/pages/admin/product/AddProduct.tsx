import { useState, useEffect, useMemo } from "react";
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
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet";

import SnackbarComponent from "../../../components/common/SnackBar";
import { UploadImage, UploadMultipleImages } from "../../../components/admin";
import fetchData from "../../../utils/fetchData";
import useMutationHook from "../../../hooks/useMutationHook";
import { addProductSchema } from "../../../validation/peoduct.validator";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [allowedSubCategories, setAllowedSubCategories] = useState<any[]>([]);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<AddProductType>({
    resolver: yupResolver(addProductSchema) as Resolver<AddProductType>,
  });

  const coverImage = watch("coverImage");
  const category = watch("categoryId");
  const navigate=useNavigate();
  const handleNavigate=()=>{
    setTimeout(() => {
      navigate("/dashboard/product")
    }, 500);
  }
  const { mutate: addProduct, isPending } = useMutationHook({
    url: "/product",
    method: "POST",
    message: "Product Added Successfully.",
    setSnack,
    handleNavigate
  });

  const { data: classifications, isPending: isClassificationsLoading } = useQuery({
    queryKey: ["getClassifications"],
    queryFn: () =>
      fetchData({
        url: "/category/classifications/list?isProduct=true",
        method: "GET",
      }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (coverImage?.length > 0) {
      setImageUrl(URL.createObjectURL(coverImage[0]));
    }
  }, [coverImage]);

  useEffect(() => {
    if (category && classifications) {
      const selectedCategory = classifications?.data.classifications.find(
        (item: any) => item._id === category
      );
      setAllowedSubCategories(selectedCategory?.subcategories || []);
    }
  }, [category, classifications]);

  const onSubmit = (data: AddProductType) => {
    const formData = new FormData();

    Array.from(data.images).forEach((image) => formData.append("images", image));
    formData.append("coverImage", data.coverImage[0]);

    const keys = ["price", "stock", "name", "desc", "categoryId", "subCategoryId", "brandId", "appliedDiscount"];
    keys.forEach((key) => formData.append(key, data[key]));

    addProduct(formData);
  };

  const renderCategorySelect = useMemo(() => {
    return classifications ? (
      <FormControl fullWidth error={!!errors.categoryId}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select labelId="category-select-label" id="category-select" label="Category" {...register("categoryId")}>
          {classifications.data.classifications?.map((category: any) => (
            <MenuItem value={category.id} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {errors.categoryId && <FormHelperText>{errors.categoryId.message}</FormHelperText>}
      </FormControl>
    ) : isClassificationsLoading ? (
      <Skeleton variant="rectangular" width={"100%"} height={"40px"} style={{ borderRadius: "5px" }} />
    ) : null;
  }, [classifications, isClassificationsLoading, errors.categoryId, register]);

  const renderSubCategorySelect = useMemo(() => {
    return classifications ? (
      <FormControl fullWidth error={!!errors.subCategoryId}>
        <InputLabel id="sub-category-select-label">Sub Category</InputLabel>
        <Select labelId="sub-category-select-label" id="sub-category-select" label="Sub Category" {...register("subCategoryId")}>
          {allowedSubCategories.length > 0
            ? allowedSubCategories.map((subCategory: any) => (
                <MenuItem value={subCategory.id} key={subCategory.id}>
                  {subCategory.name}
                </MenuItem>
              ))
            : category === "" ? (
              <MenuItem value={""} key={"no-category"}>
                Choose Category First
              </MenuItem>
            ) : (
              <MenuItem value={""} key={"no-sub-category"}>
                No Sub Category Available
              </MenuItem>
            )}
        </Select>
        {errors.subCategoryId && <FormHelperText>{errors.subCategoryId.message}</FormHelperText>}
      </FormControl>
    ) : isClassificationsLoading ? (
      <Skeleton variant="rectangular" width={"100%"} height={"40px"} style={{ borderRadius: "5px" }} />
    ) : null;
  }, [allowedSubCategories, classifications, isClassificationsLoading, errors.subCategoryId, category, register]);

  const renderBrandSelect = useMemo(() => {
    return classifications ? (
      <FormControl fullWidth error={!!errors.brandId}>
        <InputLabel id="brand-select-label">Brand</InputLabel>
        <Select labelId="brand-select-label" id="brand-select" label="Brand" {...register("brandId")}>
          {classifications.data?.brands?.map((brand: any) => (
            <MenuItem value={brand.id} key={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
        {errors.brandId && <FormHelperText>{errors.brandId.message}</FormHelperText>}
      </FormControl>
    ) : isClassificationsLoading ? (
      <Skeleton variant="rectangular" width={"100%"} height={"40px"} style={{ borderRadius: "5px" }} />
    ) : null;
  }, [classifications, isClassificationsLoading, errors.brandId, register]);

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h1" sx={{ fontSize: 25, fontWeight: "bold" }}>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ mt: 4 }}>
            <Grid md={6} xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label="Stock"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("stock")}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                label="Applied Discount"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("appliedDiscount")}
                error={!!errors.appliedDiscount}
                helperText={errors.appliedDiscount?.message}
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
              />
            </Grid>
            <Grid md={6} xs={12}>
              <UploadMultipleImages
                errors={errors}
                register={register}
                setValue={setValue}
                setSnack={setSnack}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                {...register("desc")}
              />
            </Grid>

            <Grid md={6} xs={12}>
              {renderCategorySelect}
            </Grid>

            <Grid md={6} xs={12}>
              {renderSubCategorySelect}
            </Grid>

            <Grid md={6} xs={12}>
              {renderBrandSelect}
            </Grid>
          </Grid>
          <LoadingButton type="submit" variant="contained" sx={{ mt: 4 }} loading={isPending}>
            Add Product
          </LoadingButton>
        </form>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Paper>
    </>
  );
};

export default AddProduct;
