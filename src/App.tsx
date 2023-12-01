import { createHashRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Main,
  AddCoupon,
  AddCategory,
  AddSubCategory,
  ProductDetailsAdmin,
  AddBrand,
  AddProduct,
  CouponsList,
  CategoriesList,
  SubCategoriesList,
  BrandsList,
  ProductsList,
  CategoryDetails,
  SubCategoryDetails,
  BrandDetails,
  ProductDetails,
  Home,
  SearchPage,
  CartPage,
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  Checkout,
  DirectOrder,
  Profile,
  UserOrderDetails,
  Wishlist,
  UserOrders,
  Address,
  UserMainPage,
  Unauthorized,
  OrdersList,
  OrderDetails,
  UsersList,
  Notfound,
  ChangePassword,
} from "./pages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./app.css";
import { useContext, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { AppContext } from "./context/AppContext";
import systemRoles from "./utils/systemRoles";
import { AuthRouter, NotAuthRouter } from "./components";
import { DashboardStatistics } from "./components/admin";
const App = () => {
  const queryClient = new QueryClient();
  const router = createHashRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        //search
        {
          path: "/search/:searchTerm",
          element: <SearchPage />,
        },
        //product page
        {
          path: "/product/details/:id",
          element: <ProductDetails />,
        },
        //cart
        {
          path: "/cart",
          element: <CartPage />,
        },
        //order
        {
          path: "/checkout",
          element: (
            <AuthRouter
              allowedRoles={[systemRoles.User, systemRoles.FakeAdmin]}
            >
              <Checkout />
            </AuthRouter>
          ),
        },
        {
          path: "/directOrder/:id",
          element: (
            <AuthRouter
              allowedRoles={[systemRoles.User, systemRoles.FakeAdmin]}
            >
              <DirectOrder />
            </AuthRouter>
          ),
        },
        //user info
        {
          path: "/user",
          element: (
            <AuthRouter
              allowedRoles={[systemRoles.User, systemRoles.FakeAdmin]}
            >
              <UserMainPage />
            </AuthRouter>
          ),
          children: [
            {
              path: "/user",
              element: <Profile />,
            },
            {
              path: "/user/orders",
              element: <UserOrders />,
            },
            {
              path: "/user/orders/:id",
              element: <UserOrderDetails />,
            },
            {
              path: "/user/wishlist",
              element: <Wishlist />,
            },
            {
              path: "/user/address",
              element: <Address />,
            },
          ],
        },
      ],
    },
    //auth
    {
      path: "/auth/register",
      element: (
        <NotAuthRouter>
          <Register />,
        </NotAuthRouter>
      ),
    },
    {
      path: "/auth/login",
      element: (
        <NotAuthRouter>
          <Login />,
        </NotAuthRouter>
      ),
    },
    {
      path: "/auth/forget-passwrod/",
      element: (
        <NotAuthRouter>
          <ForgetPassword />,
        </NotAuthRouter>
      ),
    },
    {
      path: "/auth/reset-password",
      element: (
        <NotAuthRouter>
          <ResetPassword />,
        </NotAuthRouter>
      ),
    },
    {
      path: "/auth/unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "/auth/changePassword",
      element: (
        <AuthRouter
          allowedRoles={[
            systemRoles.Admin,
            systemRoles.SuperAdmin,
            systemRoles.FakeAdmin,
            systemRoles.User,
          ]}
        >
          <ChangePassword />
        </AuthRouter>
      ),
    },

    {
      path: "/dashboard",
      element: (
        <AuthRouter
          allowedRoles={[
            systemRoles.SuperAdmin,
            systemRoles.Admin,
            systemRoles.FakeAdmin,
          ]}
        >
          <Dashboard />
        </AuthRouter>
      ),
      children: [
        //stat
        {
          path: "/dashboard/",
          element: <DashboardStatistics />,
        },
        //coupon
        {
          path: "/dashboard/coupon",
          element: <CouponsList />,
        },
        {
          path: "/dashboard/coupon/add",
          element: (
            <AuthRouter allowedRoles={[systemRoles.SuperAdmin]}>
              <AddCoupon />,
            </AuthRouter>
          ),
        },
        // category
        {
          path: "/dashboard/category",
          element: <CategoriesList />,
        },
        {
          path: "/dashboard/category/add",
          element: (
            <AuthRouter allowedRoles={[systemRoles.SuperAdmin]}>
              <AddCategory />
            </AuthRouter>
          ),
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
          element: (
            <AuthRouter allowedRoles={[systemRoles.SuperAdmin]}>
              <AddSubCategory />
            </AuthRouter>
          ),
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
          element: (
            <AuthRouter allowedRoles={[systemRoles.SuperAdmin]}>
              <AddBrand />
            </AuthRouter>
          ),
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
          element: <ProductDetailsAdmin />,
        },
        // order
        {
          path: "/dashboard/order",
          element: <OrdersList />,
        },
        {
          path: "/dashboard/order/details/:id",
          element: <OrderDetails />,
        },
        // user
        {
          path: "/dashboard/user",
          element: <UsersList />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
  const { show, setShow } = useContext(AppContext);
  setShow(window.innerWidth <= 900 ? true : false);
  const handleShow = () => {
    if (window.innerWidth <= 900) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleShow);
    return () => window.removeEventListener("resize", handleShow);
  }, [show]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: pink[600],
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
