import { grey } from '@mui/material/colors';
const scrollBarStyles = {
  "&::-webkit-scrollbar": {
    width: " 5px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: grey[500],
  },
};

export default scrollBarStyles;