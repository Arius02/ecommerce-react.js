import * as yup from "yup";
import { imageType, imageSize } from "../constants/imageTerm";
export const addSubCategorySchema = yup.object({
  name: yup
    .string()
    .min(2, "Sub Category Name can't be less than 2 charchters")
    .max(40, "Sub Category Name can't be more than 40 charchters")
    .required("Name is required"),
  image: yup
    .mixed<FileList>()
    .test(
      "fileReqired",
      "Sub Category Image is required.",
      (value) => value?.length != 0
    )
    .test("fileSize", "File size is too large", (value) => {
      if (value && value.length > 0) return value[0].size <= imageSize; // 5MB
      return true; // No file selected, so no size to check
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (value && value.length > 0)
        return imageType.includes(value[0].type);
      return true; // No file selected, so no type to check
    }),
    categoryId:yup.string().length(24).required()
});

export const editSubCategorySchema = yup.object({
  name: yup
    .string()
    .min(2, "Sub Category Name can't be less than 2 charchters")
    .max(40, "Sub Category Name can't be more than 40 charchters"),
  image: yup
    .mixed<FileList>()
   
    .test("fileSize", "File size is too large", (value) => {
      if (value && value.length > 0) return value[0].size <= imageSize; // 5MB
      return true; // No file selected, so no size to check
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (value && value.length > 0)
        return imageType.includes(value[0].type);
      return true; // No file selected, so no type to check
    }),
  categoryId: yup.string(),
});
