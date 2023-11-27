import React, { FC, ReactNode, createContext } from "react";
import decode from "../utils/decode";

type AppContext = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  openUserDashboard: boolean;
  setOpenUserDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  auth: AuthUserType;
  setAuth: React.Dispatch<React.SetStateAction<AuthUserType>>;
  authDialog: AuthDialogType;
  setAuthDialog: React.Dispatch<React.SetStateAction<AuthDialogType>>;
};
export const AppContext = createContext<AppContext>({
  show: false,
  setShow: () => {},
  openUserDashboard: false,
  setOpenUserDashboard: () => {},
  auth: {
    _id: null,
    role: null,
  },
  setAuth: () => {},
  authDialog: {
    open:false,
    to:""
  },
  setAuthDialog: () => {},
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [show, setShow] = React.useState(false);
  const [openUserDashboard, setOpenUserDashboard] = React.useState(false);
  const [auth, setAuth] = React.useState(
    decode(localStorage.getItem("token") || "")
  );
  const [authDialog, setAuthDialog] = React.useState({
    open:false,
    to:""
  });

  return (
    <AppContext.Provider
      value={{
        show,
        setShow,
        openUserDashboard,
        setOpenUserDashboard,
        auth,
        setAuth,
        authDialog,
        setAuthDialog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
