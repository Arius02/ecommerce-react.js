import React from "react";
import {
  Typography,
  Stack,
  IconButton,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";

type Props = {
  errors: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setSnack: React.Dispatch<React.SetStateAction<SnackbarType>>;
  images: string[];
  setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>;
};

const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: 0,
  cursor: "pointer",
});

const UpdateMultipleImages: React.FC<Props> = ({
  errors,
  setValue,
  setSnack,
  images,
  setImagesToDelete,
}) => {
  const [imagesArr, setImagesArr] = React.useState<any[]>(images);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = e.target.files;

    if (newImages) {
      const totalImages = newImages.length + imagesArr.length;
      if (newImages.length > 3 || totalImages > 3) {
        return setSnack({
          message: "You can upload only 3 images",
          open: true,
          severity: "error",
        });
      }

      const convertedFilesToUrl = Array.from(newImages).map((image: File) => ({
        secure_url: URL.createObjectURL(image),
      }));

      setValue("images", newImages);
      setImagesArr((prevImages) => [...prevImages, ...convertedFilesToUrl]);
    }
  };

  const removeImage = (imageToDelete: any) => {
    if (imageToDelete.public_id) {
      setImagesToDelete((prev) => [...prev, imageToDelete.public_id]);
    }

    const newImagesArr = imagesArr.filter(
      (image) => image.secure_url !== imageToDelete.secure_url
    );
    setImagesArr(newImagesArr);
  };

  return (
    <FormControl error={!!errors.images} sx={{ width: "100%" }}>
      {imagesArr.length > 0 && (
        <Stack
          flexDirection="row"
          justifyContent="space-around"
          my={3}
          flexWrap="wrap"
        >
          {imagesArr.map((image) => (
            <Box
              key={image.secure_url}
              sx={{
                position: "relative",
                width: { md: "100px", xs: "50px" },
              }}
            >
              <img src={image.secure_url} alt="" style={{ width: "100%" }} />
              <IconButton
                onClick={() => removeImage(image)}
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
              imagesArr.length === 1
                ? "100px"
                : imagesArr.length === 2
                ? "50px"
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
            fontWeight="semiBold"
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
