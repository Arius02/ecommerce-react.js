import { Modal } from "@mui/material";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import style from "../../../utils/modalStyle";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMutationHook from "../../../hooks/useMutationHook";
import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarComponent from "../../common/SnackBar";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Unstable_Grid2";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Stack,
} from "@mui/material";
import fetchData from "../../../utils/fetchData";
import {UploadImage} from "../index"
type Props = {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: CategoriesListType | SubCategoriesListType;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  schema: any;
  enabled?: boolean;
  name: string;
  url: string;
};

const EditItem = ({
  title,
  open,
  setOpen,
  item,
  refetch,
  schema,
  enabled,
  name,
  url,
}: Props) => {
  let defaultValues: any = {
    name: item.name,
  };
  if (defaultValues.category) {
    defaultValues.categoryId = item.category.categoryId._id;
  }
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<EditItemType>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: item.name,
      categoryId: item?.category?.categoryId?._id,
    },
  });
  const { data: classifications, isPending: isClassificationsLoading } =
    useQuery({
      queryKey: ["getClassifications"],
      queryFn: () =>
        fetchData({
          url: "/category/classifications/list",
          method: "GET",
        }),
      refetchOnWindowFocus: false,
    });
  const [imageUrl, setImageUrl] = React.useState(item?.image?.secure_url || "");
  const image = watch("image");
  React.useEffect(() => {
    if (image?.length > 0) {
      setImageUrl(URL.createObjectURL(image[0]));
    }
  }, [image]);
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: addItem, isPending } = useMutationHook({
    url,
    method: "PUT",
    message: `${name} Updated Successfully.`,
    setSnack,
    refetch,
    setOpen
  });
const onSubmit = (data: EditItemType) => {
  // Create a new FormData object to store the form data
  const formData = new FormData();

  // Create an object to store the updated key-value pairs
  const updatedKeys: any = {};

  // Check if 'data' has the 'image'
  if (data.hasOwnProperty("image") ) {
    updatedKeys.image = data.image;
    formData.append("image", updatedKeys.image[0]);
  }

  // Check if 'categoryId' in 'data' is different from 'item's categoryId
  if (data.categoryId != item.category?.categoryId._id) {
    updatedKeys.categoryId = data.categoryId;
    formData.append("categoryId", updatedKeys.categoryId);
  }

  // Check if 'name' in 'data' is different from 'item's name
  if (data.name != item.name) {
    updatedKeys.name = data.name;
    formData.append("name", updatedKeys.name);

  }

  // Check if there are any updated key-value pairs
  if (Object.keys(updatedKeys).length > 0) {
    // If there are updates, call the 'addItem' function with the 'formData'
    addItem(formData);
  }
};


  return (
    <>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={{...style,width:{md:"50%",sm:"75%",xs:"98%"}}}>
        <Typography id="edit-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2 }}
            sx={{ mt: 4 }}
          >
            <Grid md={enabled ? 6 : 12} xs={12}>
              <TextField
                label={`${name} Name`}
                variant="outlined"
                sx={{ width: "100%" }}
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
                    defaultValue={item.category?.categoryId._id}
                    {...register("categoryId")}
                  >
                    {classifications.data.classifications.map(
                      (category: any) => (
                        <MenuItem value={category.id} key={category.id}>
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
    <SnackbarComponent setSnack={setSnack} snack={snack} key={"sdlso"}/>
    </>
  );
};

export default EditItem;
