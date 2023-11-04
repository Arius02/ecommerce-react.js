import * as yup from "yup";

export const addCouponSchema = yup
  .object({
    couponCode: yup
      .string()
      .min(4, "Coupon code must be at least 4 characters")
      .max(55)
      .required("Coupon code is required"),
    couponType: yup
      .string()
      .oneOf(["percentage", "fixed_amount"], "Invalid coupon type")
      .required("Coupon type is required"),
    discountValue: yup.number().when("couponType", (couponType, schema) => {
      if (typeof couponType === "string"&&couponType === "percentage") {
        return schema
          .positive("Discount value must be a positive number")
          .min(1, "Minimum discount value is 1")
          .max(50, "Maximum discount value for percentage coupons is 50")
          .required("Discount value is required");
      } else if (typeof couponType === "string"&&couponType === "fixed_amount") {
        return schema
          .positive("Discount value must be a positive number")
          .min(1, "Minimum discount value is 1")
          .max(100, "Maximum discount value for fixed amount coupons is 100")
          .required("Discount value is required");
      } else {
        return schema
          .positive("Discount value must be a positive number")
          .min(1, "Minimum discount value is 1");
      }
    }),
    usageLimit: yup
      .number()
      .positive("Usage limit must be a positive number")
      .min(1, "Minimum usage limit is 1")
      .max(200)
      .required("Usage limit is required"),
    userRestrictions: yup
      .string()
      .oneOf(
        [
          "first_time_shoppers",
          "vip_members",
          "existing_customers",
          "same_city",
          "all",
        ],
        "Invalid user restriction"
      )
      .required("User restriction is required"),
    fromDate: yup
      .date()
      .min(
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        "From date must be after the current date minus 24 hours"
      )
      .required("From date is required"),
    toDate: yup
      .date()
      .min(yup.ref("fromDate"), "To date must be after the from date")
      .required("To date is required"),
    minPurchaseAmount: yup
      .number()
      .positive("Minimum purchase amount must be a positive number")
      .min(200, "Minimum purchase amount is 200")
      .required("Minimum purchase amount is required"),
  })
  .required();
  
export const editCouponSchema = yup
  .object({
    discountValue: yup.number().when("couponType", (couponType, schema) => {
      if (typeof couponType === "string" && couponType === "percentage") {
        return schema
          .positive("Discount value must be a positive number")
          .min(1, "Minimum discount value is 1")
          .max(50, "Maximum discount value for percentage coupons is 50")
          .required("Discount value is required");
      } else if (
        typeof couponType === "string" &&
        couponType === "fixed_amount"
      ) {
        return schema
          .positive("Discount value must be a positive number")
          .min(1, "Minimum discount value is 1")
          .max(100, "Maximum discount value for fixed amount coupons is 100")
          .required("Discount value is required");
      } else {
        return schema
          .positive("Discount value must be a positive number")
          .min(1, "Minimum discount value is 1");
      }
    }),
    usageLimit: yup
      .number()
      .positive("Usage limit must be a positive number")
      .min(1, "Minimum usage limit is 1")
      .max(200),
    fromDate: yup
      .date()
      .min(
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        "From date must be after the current date minus 24 hours"
      ),
    toDate: yup
      .date()
      .min(yup.ref("fromDate"), "To date must be after the from date"),
    minPurchaseAmount: yup
      .number()
      .positive("Minimum purchase amount must be a positive number")
      .min(200, "Minimum purchase amount is 200"),
  })
  .required();