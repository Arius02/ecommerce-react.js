import { Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import useQueryHook from "../../../hooks/useQueryHook";
const DashboardStatistics = () => {
    const {data:user}= useQueryHook({
        url:"/auth",
        query:"getUser",
        selectedProp:"user"
    })as{
        data:any
    }
  return (
    <Stack justifyContent={"space-between"} alignItems={"center"}  height={"100vh"} >
        {
            user?<Typography color={blueGrey[900]} variant="h6">
                Hello <Typography color={"primary"} display={"inline-block"} variant="h5">{user.name}</Typography> This is your dashboard where your statistics will
                 be displayed but this will take time to collect it and it will be displayed here
            </Typography>:""
            
        }
    </Stack>
  );
};

export default DashboardStatistics;
