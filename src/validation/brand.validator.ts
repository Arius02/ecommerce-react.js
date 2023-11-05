import * as yup from "yup"
import { imageSize, imageType } from "../constants/imageTerm";
export const addBrandSchema = yup.object({
    name: yup.string().min(2,"Brand Name can't be less than 2 charchters").max(40,"Brand Name can't be more than 40 charchters").required("Name is required"),
    image: yup.mixed<FileList>()
    .test("fileReqired","Brand Image is required.",(value)=>value?.length!=0)
    .test('fileSize', 'File size is too large', (value) => {
        if (value&& value.length >0) return value[0].size <= imageSize; // 5MB
         return true; // No file selected, so no size to check
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (value && value.length >0)   return imageType.includes(value[0].type);
        return true; // No file selected, so no type to check
    })
})
export const editBrandSchema = yup.object({
  name: yup
    .string()
    .min(2, "Brand Name can't be less than 2 charchters")
    .max(40, "Brand Name can't be more than 40 charchters"),
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
});