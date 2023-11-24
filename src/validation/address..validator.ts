import * as yup from "yup";

export const addAddressSchema = yup.object({
  governorate: yup.object(),
  city: yup.string().min(3).required("City Is Required"),
  street: yup
    .string()
    .min(5, "Street Address must be at least 5 charchters")
    .max(100, "Street Address can't be more than 100 charchters")
    .required("Street Is Required"),
  phone: yup
    .string()
    .matches(/^(01[0-2]|015)\d{8}$/)
    .required("Phone Is Required"),
});
