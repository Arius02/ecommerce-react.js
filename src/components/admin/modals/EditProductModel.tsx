import {
  TextField,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  FormHelperText,
  Stack,
  Button
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import fetchData from "../../../utils/fetchData.ts";
import { editProductSchema } from "../../../validation/peoduct.validator.ts";
import useMutationHook from "../../../hooks/useMutationHook.tsx";
import style from "../../../utils/modalStyle.ts";
import UpdateMultipleImages from "../product/UpdateMultipleImages.tsx";
import UploadImage from "../common/UploadImage.tsx";
import SnackbarComponent from "../../common/SnackBar.tsx";
type Props = {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    product:any;
    refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

// TODO refactor
const EditProductModal = ({open,setOpen, product,refetch}:Props) => {
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
    resolver: yupResolver(editProductSchema) as any,
    defaultValues: {
      appliedDiscount: product.appliedDiscount,
      brandId: product.brand?._id,
      categoryId: product.category?.categoryId._id,
      subCategoryId: product.subCategory?.subCategoryId._id,
      desc:product.desc,
      name:product.name,
      price:product.price,
      stock:product.stock
    },
  });
  const [imageUrl, setImageUrl] = React.useState(product.coverImage?.secure_url);
  const coverImage = watch("coverImage");
  React.useEffect(() => {
    if (coverImage?.length > 0) {
      setImageUrl(URL.createObjectURL(coverImage[0]));
    }
  }, [coverImage]);

  const { mutate: editProduct, isPending } = useMutationHook({
    url:   `/product/${product._id}`,
    method: "PUT",
    message: "Product Updated Successfully.",
    setSnack,
    refetch,
    setOpen
  });
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
  const category = watch("categoryId");
  const [allowedSubCategories, setAllowedSubCategories] = React.useState<any[]>(
    []
  );
  React.useEffect(() => {
    if (category != "" && classifications) {
      setAllowedSubCategories(
        classifications?.data.classifications.find(
          (item: any) => item._id === category
        )?.subcategories
      );
    }
  }, [category]);
  const [imagesToDelete, setImagesToDelete] = React.useState<string[]>([]);
  const onSubmit = (data: AddProductType) => {
    const formData = new FormData();
    const updatedKeys:any={}
  if (data.hasOwnProperty("images")) {
    updatedKeys.images = data.images;
    for (const image of updatedKeys.images) {
      formData.append("images", image);
    }
            formData.append("imagesToDelete",`${imagesToDelete}`)

  }
    if (data.hasOwnProperty("coverImage")) {
            updatedKeys.coverImage = data.coverImage;
      formData.append("coverImage", updatedKeys.coverImage[0]);
    }
    const keys = [
      "price",
      "stock",
      "name",
      "desc",
      "categoryId",
      "subCategoryId",
      "brandId",
      "appliedDiscount",
    ];
    for (const key of keys) {
        if(data[key]!==product[key]){
            if(key=="categoryId"){
                if (data.categoryId != product.category?.categoryId._id) {
                  updatedKeys.categoryId = data.categoryId;
                  formData.append(key, updatedKeys.categoryId);
                }    
            }
             else if (key == "subCategoryId") {
            
               if (data.subCategoryId != product.subCategory?.subCategoryId.id) {
                 updatedKeys.subCategoryId = data.subCategoryId;
                 formData.append(key, updatedKeys.subCategoryId);
               }
             }
              else if (key == "brandId") {
                if (data.brandId != product.brand?._id) {
                       updatedKeys.brandId = data.brandId;
                       formData.append(key, updatedKeys.brandId);
                }
              }else{
                  updatedKeys[key]=data[key]
                  formData.append(key, updatedKeys[key]);
              }
        }
    }
    if(Object.keys(updatedKeys).length)
    editProduct(formData);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{...style,width:{md:"60%",sm:"75%",xs:"98%",overflowY:"scroll",height:"100%"}}}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2 }}
              sx={{ mt: 4 }}
              // gap{1}
            >
              <Grid xs={12}>
                <TextField
                  label={`Name`}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label={`Stock`}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  {...register("stock")}
                  error={!!errors.stock}
                  helperText={errors.stock && errors.stock.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label={`Price`}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  {...register("price")}
                  error={!!errors.price}
                  helperText={errors.price && errors.price.message}
                />
              </Grid>
              <Grid xs={12}>
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
              <Grid xs={12}>
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
              <Grid xs={12}>
                <UpdateMultipleImages
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  key={43866}
                  setSnack={setSnack}
                  images={product.images}
                  setImagesToDelete={setImagesToDelete}
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

              <Grid xs={12}>
                {classifications && (
                  <FormControl fullWidth error={!!errors.categoryId}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      label="Category"
                      {...register("categoryId")}
                      defaultValue={product.category?.categoryId._id}
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
                      <FormHelperText>
                        {errors.categoryId.message}
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
              <Grid xs={12}>
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
                      defaultValue={product.subCategory?.subCategoryId._id}
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
              <Grid xs={12}>
                {classifications && (
                  <FormControl fullWidth error={!!errors.brandId}>
                    <InputLabel id="brand-select-label">brand</InputLabel>
                    <Select
                      labelId="brand-select-label"
                      id="brand-select"
                      label="brand"
                      {...register("brandId")}
                      defaultValue={product.brand?._id}
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
};

export default EditProductModal;
