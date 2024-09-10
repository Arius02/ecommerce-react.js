import React, { MouseEvent, useState } from 'react';
import { Typography, Stack, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AlertMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          onClick={handleClick}
          size="medium"
          sx={{
            display: 'flex',
            '&:hover': {
              bgcolor: 'transparent',  
            },
          }}
          aria-controls={open ? 'notification-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <NotificationsIcon sx={{ color: grey[500] }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 0px 10px rgba(0,0,0,0.1))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {[1, 2, 3].map((index) => (
          <MenuItem key={index} onClick={handleClose}>
            <Stack alignItems="center" gap={2} direction="row" py={1} pr={4}>
              <NotificationsIcon color="info" />
              <Stack>
                <Typography variant="body2" fontWeight="bold">
                  New order for this site
                </Typography>
                <Typography variant="subtitle2">1 year ago</Typography>
              </Stack>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AlertMenu;
