import {
  Typography,
  Stack,
  Button,
  IconButton,
  FormHelperText,
  FormControl,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  imageUrl: string;
  errors: Record<string, any>;
  errorName: string;
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: 0,
});

const UploadImage: React.FC<Props> = ({
  imageUrl,
  errors,
  errorName,
  name,
  register,
  setValue,
  setImageUrl,
}) => {
  return (
    <FormControl error={!!errors[errorName]} sx={{ width: "100%" }}>
      {imageUrl === "" ? (
        <Stack
          sx={{
            height: "200px",
            backgroundColor: blueGrey[50],
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
            fontSize={{ md: "18px", xs: "11px" }}
            fontWeight="semibold"
          >
            Drag & drop {name} image here
          </Typography>
          <Typography
            variant="body1"
            color={grey[400]}
            fontSize={{ md: "12px", xs: "10px" }}
            fontWeight="bold"
            position="relative"
            sx={{
              "&::before": {
                content: "''",
                width: { md: "50px", xs: "30px" },
                height: "1px",
                background: grey[300],
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: "200%",
              },
              "&::after": {
                content: "''",
                width: { md: "50px", xs: "30px" },
                height: "1px",
                background: grey[300],
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "200%",
              },
            }}
          >
            OR
          </Typography>
          <VisuallyHiddenInput type="file" {...register(errorName)} />
          <Button variant="outlined" sx={{ fontSize: { md: "14px", xs: "12px" } }}>
            Select Image
          </Button>
        </Stack>
      ) : (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <IconButton
            onClick={() => {
              setImageUrl("");
              setValue(errorName, null as unknown as FileList);
            }}
            sx={{ ml: "auto" }}
            aria-label="delete image"
          >
            <CloseIcon />
          </IconButton>
          <img src={imageUrl} style={{ width: "50%" }} alt={`${name} preview`} />
        </Stack>
      )}
      {errors[errorName] && (
        <FormHelperText>{errors[errorName].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default UploadImage;
