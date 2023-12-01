import dayjs from "dayjs";
import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name can't be less than 3 characters")
    .max(40, "Name can't be more than 40 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
    )
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password Not Correct")
    .required("Password is required"),
});
export const forgetPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
    )
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});
export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
    )
    .required("Old Password is required"),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
    )
    .required("New Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const editProfileSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name can't be less than 3 characters")
    .max(40, "Name can't be more than 40 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  birth: yup
    .date()
    .test("is-before-today", "Date must be before today", (value) => {
      console.log(dayjs(value, "DD/MM/YYYY").isBefore(dayjs(), "day"));
      return dayjs(value, { format: "DD/MM/YYYY" }).isBefore(dayjs(), "day");
    })
    .required("Date field is required"),
});
