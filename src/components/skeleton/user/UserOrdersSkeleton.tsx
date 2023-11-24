import {Paper,Skeleton} from '@mui/material'

const UserOrdersSkeleton = () => {
  return [34, 3543, 3453, 215, 5436].map((order: number) => (
    <Paper
      key={order}
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Skeleton variant="text" sx={{ fontSize: "20px", width: "160px" }} />
      <Skeleton
        variant="rounded"
        width="80px"
        height={"30px"}
        sx={{borderRadius:"25px"}}
      />
      <Skeleton variant='text' sx={{fontSize:"18px",width:"90px"}}/> 
      <Skeleton variant='text' sx={{fontSize:"18px",width:"70px"}}/>
      <Skeleton variant="circular" sx={{width:"40px",height:"40px"}} />
    </Paper>
  ));
}

export default UserOrdersSkeleton