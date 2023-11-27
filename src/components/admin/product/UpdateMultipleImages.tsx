import {
  Typography,
  Stack,
  IconButton,
  Box,
} from "@mui/material";

import * as React from "react";
import { styled } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
type Props = {
  errors: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setSnack: React.Dispatch<React.SetStateAction<SnackbarType>>;
  images: string[];
  setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>;
};

const UpdateMultipleImages = ({
  errors,
  setValue,
  setSnack,
  images,
  setImagesToDelete,
}: Props) => {
  const [imagesArr, setImagesArr] = React.useState<any[]>(images);
  // const [imagesTo]

  const VisuallyHiddenInput = styled("input")({
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;

    if (images) {
      if (images?.length > 3 || images?.length + imagesArr.length > 3) {
        return setSnack({
          message: "You can upload only 3 images",
          open: true,
          severity: "error",
        });
      }
      const convertedFilesToUrl = Array.from(images).map((image: File) => {
        return {
          secure_url: URL.createObjectURL(image),
        };
      });
      setValue("images", images);

      setImagesArr((prevImsetImagesArr: any) => [
        ...prevImsetImagesArr,
        ...convertedFilesToUrl,
      ]);
    }
  };
  React.useEffect(() => {}, [imagesArr]);
  const removeImage = (imageToDelete: any) => {
    if (imageToDelete.public_id) {
      setImagesToDelete((prev)=>[...prev,imageToDelete.public_id]);
      console.log(imageToDelete);
    }
    const newImagesArr = imagesArr.filter(
      (image: any) => imageToDelete.secure_url !== image.secure_url
    );
    setImagesArr(newImagesArr);
  };
  return (
    <FormControl error={!!errors.images} sx={{ width: "100%" }}>
      {imagesArr.length > 0 && (
        <Stack
          flexDirection={"row"}
          justifyContent={"space-around"}
          my={3}
          flexWrap={"wrap"}
        >
          {imagesArr.map((image) => (
            <Box sx={{ position: "relative" ,width:{md:"100px",xs:"50px"}}} key={image.secure_url}>
              <img
                src={image.secure_url}
                style={{ width: "100%" }}
              />
              <IconButton
                onClick={() => {
                  removeImage(image);
                }}
                sx={{ position: "absolute", top: 0, right: 0 }}
                aria-label="delete image"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
      {imagesArr.length < 3 && (
        <Stack
          sx={{
            height:
              imagesArr.length == 1
                ? "100px"
                : imagesArr.length == 2
                ? "50px"
                : imagesArr.length == 3
                ? 0
                : "200px",
            border: "1px black dashed",
            borderRadius: "5px",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          gap={3}
        >
          <Typography
            variant="body1"
            color="gray"
            fontSize={{ md: "18px", xs: "14px" }}
            fontWeight="smeibold"
          >
            Drag & drop Product Images here or{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>Browse</span>
          </Typography>
          <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
        </Stack>
      )}

      {errors.images && (
        <FormHelperText>{errors.images.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default UpdateMultipleImages;
