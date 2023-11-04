/* eslint-disable @typescript-eslint/no-explicit-any */
type FetchDataType ={
  url: string;
  method: string;
  data?: any;
  token?: string;
}

//coupon
type AddCouponType = {
  couponCode: string;
  usageLimit: number;
  couponType: "percentage" | "fixed_amount";
  userRestrictions:
    | "all"
    | "first_time_shoppers"
    | "vip_members"
    | "existing_customers";
  fromDate: date;
  toDate: date;
  minPurchaseAmount: number;
  discountValue:number
};
type EditCouponType = {
  usageLimit: number;
  fromDate: date;
  toDate: date;
  minPurchaseAmount: number;
  discountValue: number;
};
type CouponListType = {
  [key: string]: any;
  couponCode: string;
  usageLimit: number;
  couponType: "percentage" | "fixed_amount";
  userRestrictions:
    | "all"
    | "first_time_shoppers"
    | "vip_members"
    | "existing_customers";
  fromDate: date;
  toDate: date;
  minPurchaseAmount: number;
  discountValue: number;
  usageHistory: string[];
  usageCount: numbe;
  createdBy: string;
  status: string;
  _id: string;
};
type SnackbarType = {
  open: boolean;
  message: string;
  severity: AlertColor;
}

// items category, subCategory and brand 
type AddItemType = {
  [key: string]: any;
  name: string;
  image: FileList;
  categoryId?: string;
};
type EditItemType = {
  [key: string]: any;
  name: string;
  image: FileList;
  categoryId?:{
    name:string;
    _id:string
  };
};
type CategoriesListType = {
  [key: string]: any;

  name: string;
  image: {
    secure_url: string;
  };
  _id: string;
  createdBy: string;
};
type SubCategoriesListType = {
  [key: string]: any;
  name: string;
  image: {
    secure_url: string;
    _id:string
  };
  _id: string;
  category: {
    categoryId:{
      name:string;
      _id:String
    }
  };
  createdBy: string;
};type BrandsListType = {
  name: string;
  image: {
    secure_url: string;
  };
  _id: string;
  createdBy: string;
};
//product
type AddProductType = {
  [key: string]: any;
  name: string;
  price: number;
  desc: string;
  appliedDiscount: number;
  stock: number;
  categoryId: string;
  subCategoryId: string;
  brandId: string;
  coverImage: FileList;
  images: FileList;
};
type ProductListType = {
  [key: string]: any;
  name: string;
  price: number;
  desc: string;
  appliedDiscount: number;
  priceAfterDiscount:number;
  stock: number;
  category: {
    categoryId:{name:string;
    _id:string}
  };
  subCategory: {
    subCategoryId:{name:string;
    _id:string}
  };
  brand: {
    name:string;
    _id:string
  };
  coverImage: {
    secure_url:string
  };
  sold:number;

};

type RivewsListType = {
  Rating: number;
 reviewDisc:string,
  _id: string;
  userId: string;
};