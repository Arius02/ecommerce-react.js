import {
  Typography,
  Stack,
  IconButton,
  TableContainer,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { formatFileSize } from "../../../constants/imageTerm";
type Props = {
  errors: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setSnack:React.Dispatch<React.SetStateAction<SnackbarType>>
};

const UploadMultipleImages = ({errors,setValue,setSnack}: Props) => {
  const [imagesArr, setImagesArr] = React.useState<any[]>([]);

const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: 0,
  cursor: "pointer",

});
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const images = e.target.files;
if(images){
  if (images?.length > 3 || images?.length + imagesArr.length > 3) {
    setSnack({
      message: "You can upload only 3 images",
      open: true,
      severity: "error",
    });
  }
      setImagesArr((prevImsetImagesArr: any) => [
        ...prevImsetImagesArr,
        ...Array.from(images),
      ]);
}
};
React.useEffect(()=>{
    setValue("images", imagesArr);

},[imagesArr])
 const removeImage = (imageToDelete:string) => {
   const newImagesArr = imagesArr.filter(
     (image: any) => imageToDelete !== image.name
   );
   setImagesArr(newImagesArr);
 };
  return (
    <FormControl error={!!errors.images} sx={{ width: "100%" }}>
      {imagesArr.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {imagesArr.map((image) => (
                <TableRow
                  key={image.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={URL.createObjectURL(image)}
                        style={{ width: "100px" }}
                      />
                      <IconButton
                        onClick={() => {
                          removeImage(image.name);
                        }}
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        aria-label="delete image"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <Tooltip title={image.name}>
                    <TableCell align="center">
                      {image.name.slice(0, 4)}...
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center" sx={{fontSize:{md:"14px",xs:"12px",whiteSpace:"nowrap"}}}>
                    {formatFileSize(image.size)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {imagesArr.length < 3 && (
        <Stack
          sx={{
            height:
              imagesArr.length == 1
                ? "100px"
                : imagesArr.length == 2
                ? "60px"
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
            fontSize={{ md: "18px", sm: "14px", xs: "12px" }}
            fontWeight="smeibold"
            textAlign={"center"}
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

export default UploadMultipleImages;
