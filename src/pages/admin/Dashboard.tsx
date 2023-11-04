import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import {useState} from 'react'
import { Navbar, Sidebar } from '../../components/admin';

const Dashboard = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
const drawerWidth = 280;

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <Sidebar
        setOpen={setOpen}
        open={open}
        Content={<Outlet />}
      />
    </Box>
  );
}

export default Dashboard