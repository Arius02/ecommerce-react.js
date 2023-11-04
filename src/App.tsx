
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { Dashboard, Main, AddCoupon, AddCategory, AddSubCategory, AddBrand, AddProduct, CouponsList, CategoriesList, SubCategoriesList, BrandsList, ProductsList, CategoryDetails, SubCategoryDetails, BrandDetails, ProductDetails, Home } from "./pages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { SnackbarProvider } from "notistack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [{
        path:"/",
        element:<Home/>
      }],
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        //coupon
        {
          path: "/dashboard/coupon",
          element: <CouponsList />,
        },
        {
          path: "/dashboard/coupon/add",
          element: <AddCoupon />,
        },
        // category
        {
          path: "/dashboard/category",
          element: <CategoriesList />,
        },
        {
          path: "/dashboard/category/add",
          element: <AddCategory />,
        },
        {
          path: "/dashboard/category/details/:id",
          element: <CategoryDetails />,
        },
        //subCategory
        {
          path: "/dashboard/subCategory",
          element: <SubCategoriesList />,
        },
        {
          path: "/dashboard/subCategory/add",
          element: <AddSubCategory />,
        },
        {
          path: "/dashboard/subCategory/details/:id",
          element: <SubCategoryDetails />,
        },
        //brand
        {
          path: "/dashboard/brand",
          element: <BrandsList />,
        },
        {
          path: "/dashboard/brand/add",
          element: <AddBrand />,
        },
        {
          path: "/dashboard/brand/dtails/:id",
          element: <BrandDetails />,
        },
        //product
        {
          path: "/dashboard/product",
          element: <ProductsList />,
        },
        {
          path: "/dashboard/product/add",
          element: <AddProduct />,
        },
        {
          path: "/dashboard/product/details/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ]); 
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
        <SnackbarProvider maxSnack={3}>
          <RouterProvider router={router} />
        </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App
