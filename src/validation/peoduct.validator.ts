import * as yup from "yup";
import { imageSize, imageType } from "../constants/imageTerm";

export const addProductSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(55, "Name must not exceed 55 characters")
    .required("Name is required"),
  desc: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(255, "Description must not exceed 255 characters"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1")
    .required("Price is required"),
  appliedDiscount: yup
    .number()
    .positive("Discount must be a positive number")
    .min(1, "Discount must be at least 1")
    .max(100, "Discount cannot exceed 100"),
  stock: yup
    .number()
    .integer("Stock must be an integer")
    .positive("Stock must be a positive number")
    .min(1, "Stock must be at least 1")
    .required("Stock is required"),
  categoryId: yup.string().length(24).required("Category is required"),
  subCategoryId: yup.string().length(24).required("Subcategory is required"),
  brandId: yup.string().length(24).required("Brand is required"),
  coverImage: yup
    .mixed<FileList>()
    .test(
      "fileReqired",
      "Product Image is required.",
      (value) => value?.length != 0
    )
    .test("fileSize", "File size is too large", (value) => {
      if (value && value.length > 0) return value[0].size <= imageSize; // 5MB
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (value && value.length > 0)
        return imageType.includes(value[0].type);
    }),
  images: yup
    .mixed<FileList>()
    .test(
      "fileReqired",
      "You have to upload 3 images for the Product.",
      (value) => {
        if (value && value.length < 3) {
          return false;
        }
        return true;
      }
    )

    .test("fileSize", "Size of eaech image must be less than 5MB", (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          console.log(value[i].size >= imageSize);
          if (value[i].size >= imageSize) {
            return false;
          }
        }
        return true;
      }
    })
    .test(
      "fileType",
      "Unsupported image type [jpeg,png,jpg] only are supported",
      (value) => {
        if (value && value.length > 0) {
          console.log(value[0].type);
          for (let i = 0; i < value.length; i++) {
            const isValidType =imageType.includes(value[i].type);
            if (!!isValidType) {
              return true;
            }
          }
          return false;
        }
      }
    ),
});

export const editProductSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(55, "Name must not exceed 55 characters")
    .optional(),
  desc: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(255, "Description must not exceed 255 characters")
    .optional(),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1")
    .optional(),
  appliedDiscount: yup
    .number()
    .positive("Discount must be a positive number")
    .min(1, "Discount must be at least 1")
    .max(100, "Discount cannot exceed 100")
    .optional(),
  stock: yup
    .number()
    .integer("Stock must be an integer")
    .positive("Stock must be a positive number")
    .min(1, "Stock must be at least 1")
    .optional(),
  categoryId: yup.string().length(24).optional(),
  subCategoryId: yup.string().length(24).optional(),
  brandId: yup.string().length(24).optional(),
  coverImage: yup
    .mixed<FileList>()
    .test("fileSize", "File size is too large", (value) => {
      if (value && value.length > 0) {
        return value[0].size <= imageSize;
      } else {
        return true;
      }
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (value && value.length > 0) {
        return imageType.includes(value[0].type);
      } else {
        return true;
      }
    }),
  images: yup
    .mixed<FileList>()
    .test("fileSize", "Size of eaech image must be less than 5MB", (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          console.log(value[i].size >= imageSize);
          if (value[i].size >= imageSize) {
            return false;
          }
        }
        return true;
      } else {
        return true;
      }
    })
    .test(
      "fileType",
      "Unsupported image type [jpeg,png,jpg] only are supported",
      (value) => {
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            const isValidType = imageType.includes(value[i].type);
            if (!isValidType) {
              return false;
            }
          }
          return true;
        } else {
          return true;
        }
      }
    ),
});
