import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useState,  useContext } from "react";
import { Navbar, Sidebar } from '../../components/admin';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { show } = useContext(AppContext);
  const [open, setOpen] = useState(show ? false : true);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

const drawerWidth = show?"100%":"280px";

  return (
    <Box sx={{ display: "flex" ,overflowX:"hidden"}}>
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <Sidebar
        setOpen={setOpen}
        open={open}
        Content={<Outlet />}
        drawerWidth={drawerWidth}
        show={show}
      />
    </Box>
  );
}

export default Dashboard