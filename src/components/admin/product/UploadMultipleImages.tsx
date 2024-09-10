import React, { useState, useEffect } from 'react';
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
  styled,
  FormHelperText,
  FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { UseFormSetValue, UseFormRegister } from 'react-hook-form';
import { formatFileSize } from '../../../constants/imageTerm';

type Props = {
  errors: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setSnack: React.Dispatch<React.SetStateAction<SnackbarType>>;
};

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  cursor: 'pointer',
});

const UploadMultipleImages = ({ errors, setValue, setSnack }: Props) => {
  const [imagesArr, setImagesArr] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 3 || files.length + imagesArr.length > 3) {
        setSnack({
          message: 'You can upload only 3 images',
          open: true,
          severity: 'error',
        });
        return;
      }
      setImagesArr((prevImages) => [
        ...prevImages,
        ...Array.from(files),
      ]);
    }
  };

  useEffect(() => {
    setValue('images', imagesArr);
  }, [imagesArr, setValue]);

  const removeImage = (imageName: string) => {
    setImagesArr((prevImages) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  return (
    <FormControl error={!!errors.images} sx={{ width: '100%' }}>
      {imagesArr.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="image table">
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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        style={{ width: '100px' }}
                      />
                      <IconButton
                        onClick={() => removeImage(image.name)}
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        aria-label="delete image"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <Tooltip title={image.name}>
                    <TableCell align="center">
                      {image.name.length > 4 ? `${image.name.slice(0, 4)}...` : image.name}
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center" sx={{ fontSize: { md: '14px', xs: '12px' }, whiteSpace: 'nowrap' }}>
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
            height: imagesArr.length === 1 ? '100px' : imagesArr.length === 2 ? '60px' : '200px',
            border: '1px dashed black',
            borderRadius: '5px',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          gap={3}
        >
          <Typography
            variant="body1"
            color="gray"
            fontSize={{ md: '18px', sm: '14px', xs: '12px' }}
            fontWeight="bold"
            textAlign="center"
          >
            Drag & drop Product Images here or{' '}
            <span style={{ color: 'black', fontWeight: 'bold' }}>Browse</span>
          </Typography>
          <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
        </Stack>
      )}
      {errors.images && <FormHelperText>{errors.images.message}</FormHelperText>}
    </FormControl>
  );
};

export default UploadMultipleImages;
