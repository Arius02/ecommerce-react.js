import {  Typography, Stack, Button, IconButton} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material"
import { blueGrey, grey } from "@mui/material/colors";
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl";
import {UseFormSetValue,UseFormRegister} from "react-hook-form"
import CloseIcon from "@mui/icons-material/Close";
type Props = {
    imageUrl:string;
    errors:any;
    errorName:string;
    name:string;
    register: UseFormRegister<any>;
    setValue:UseFormSetValue<any>;
    setImageUrl:React.Dispatch<React.SetStateAction<string>>
}
const UploadImage = ({ imageUrl,
    errors,
    errorName,
    name,
    register,
    setValue,
    setImageUrl}: Props) => {
    const VisuallyHiddenInput = styled("input")({
      position: "absolute",
      inset:0,
      opacity:0,
      
    });
  return (
    <FormControl error={!!errors[errorName]} sx={{ width: "100%" }}>
      {imageUrl == "" ? (
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
            fontWeight="smeibold"
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
          <Button
            variant="outlined"
            sx={{ fontSize: { md: "14px", xs: "12px" } }}
            // onClick={()=>}
          >
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
          <img src={imageUrl} style={{ width: "50%" }} />
        </Stack>
      )}
      {errors[errorName] && (
        <FormHelperText>{errors[errorName].message}</FormHelperText>
      )}
    </FormControl>
  );
}

export default UploadImage