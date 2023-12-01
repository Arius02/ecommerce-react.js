// ======================== ADMIN PAGES =========================
export {default as Dashboard} from "./admin/Dashboard"

export { default as CouponsList } from "./admin/coupon/CouponsList";
export { default as AddCoupon } from "./admin/coupon/AddCoupon";

export { default as AddCategory } from "./admin/category/AddCategory";
export { default as CategoriesList } from "./admin/category/CategoriesList";
export { default as CategoryDetails } from "./admin/category/CategoryDetails";

export { default as AddSubCategory } from "./admin/subCategory/AddSubCategory";
export { default as SubCategoriesList } from "./admin/subCategory/SubCategoriesList";
export { default as SubCategoryDetails } from "./admin/subCategory/SubCategoryDetails";

export { default as AddBrand } from "./admin/brand/AddBrand";
export { default as BrandsList } from "./admin/brand/BrandsList";
export { default as BrandDetails } from "./admin/brand/BrandDetails";

export { default as AddProduct } from "./admin/product/AddProduct";
export { default as ProductsList } from "./admin/product/ProductsList";
export { default as ProductDetailsAdmin } from "./admin/product/ProductDetails";

export { default as OrdersList } from "./admin/order/OrdersList";
export { default as OrderDetails } from "./admin/order/OrderDetails";


export { default as UsersList } from "./admin/user/UsersList";

//========================== USER PAGES =========================
export { default as Main } from "./Main";
export { default as Home } from "./Home";
export { default as SearchPage } from "./SearchPage";
export { default as ProductDetails } from "./ProductDetails";
export { default as CartPage } from "./CartPage";
export { default as Checkout } from "./checkout/Checkout";
export { default as DirectOrder } from "./checkout/DirectOrder";


//========================== AUTH PAGES =========================
export { default as Login } from "./auth/Login";
export { default as Register } from "./auth/Register";
export { default as ForgetPassword } from "./auth/ForgetPassword";
export { default as ChangePassword } from "./auth/ChangePassword";
export { default as ResetPassword } from "./auth/ResetPassword";
export { default as Unauthorized } from "./auth/Unauthorized";

// ====================== USER INFO PAGES =======================

export { default as UserMainPage } from "./user/UserMainPage";
export { default as Profile } from "./user/Profile";
export { default as UserOrders } from "./user/UserOrders";
export { default as UserOrderDetails } from "./user/UserOrderDetails";
export { default as Wishlist } from "./user/Wishlist";
export { default as Address } from "./user/Address";


// ====================== NOTFOUND===============================

export { default as Notfound } from "./Notfound";