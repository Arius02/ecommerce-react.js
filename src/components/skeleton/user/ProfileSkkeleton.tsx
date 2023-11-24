import { Grid, Paper, Skeleton } from "@mui/material";

const ProfileSkkeleton = () => {
  return (
    <>
      <Grid item md={6} xs={12} p={2}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "250px",
          }}
        >
          <Skeleton variant="circular" height="150px" width="150px" />

          <Skeleton variant="text" sx={{ fontSize: "24px", width: "120px" }} />
        </Paper>
      </Grid>
      <Grid item md={6} xs={12} p={2}>
        <Paper sx={{ p: 2, height: "250px" }}>
          <Skeleton variant="text" width={"50px"} sx={{ fontSize: "20px" }} />
          <Skeleton variant="text" width={"130px"} sx={{ mb: 2 }} />
          <Skeleton variant="text" width={"50px"} sx={{ fontSize: "20px" }} />
          <Skeleton variant="text" width={"90px"} sx={{ mb: 2 }} />
          <Skeleton variant="text" width={"56px"} sx={{ fontSize: "20px" }} />
          <Skeleton variant="text" width={"120px"} />
        </Paper>
      </Grid>
    </>
  );
};

export default ProfileSkkeleton;
