import { Box, Stack, Typography, Grid, Paper, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { pink, blueGrey } from "@mui/material/colors";
import useQueryHook from "../../hooks/useQueryHook";
import EditProfile from "../../components/dailogs/EditProfile";
import { useState } from "react";
import ProfileSkkeleton from "../../components/skeleton/user/ProfileSkkeleton";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {
    data: user,
    isPending,
    refetch,
  } = useQueryHook({
    url: "/auth",
    query: "getUser",
    selectedProp: "user",
  });
  return (
    <Box>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <PersonIcon sx={{ color: pink[500] }} />
          <Typography
            fontWeight={"bold"}
            color={blueGrey[900]}
            fontSize={"24px"}
          >
            My Profile
          </Typography>
        </Stack>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          color="secondary"
        >
          Edit Profile
        </Button>
      </Stack>
        <Grid container>
      {user && (
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
              <Stack
                sx={{
                  bgcolor: pink[500],
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  height: "150px",
                  width: "150px",
                  fontSize: "50px",
                  textTransform: "uppercase",
                }}
              >
                {user.name.slice(0, 1)}
              </Stack>
              <Typography
                fontWeight={"bold"}
                color={blueGrey[900]}
                fontSize={"24px"}
              >
                {user.name}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={6} xs={12} p={2}>
            <Paper sx={{ p: 2, height: "250px" }}>
              <Box mb={2}>
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  color={blueGrey[200]}
                >
                  Email
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  color={blueGrey[900]}
                >
                  {user.email}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  color={blueGrey[200]}
                >
                  Gender
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  color={blueGrey[900]}
                >
                  {user.gender}
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  color={blueGrey[200]}
                >
                  Birth
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  color={blueGrey[900]}
                >
                  {user.birth || "---"}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          </>
        )}
        {
          isPending&& <ProfileSkkeleton/>
        }
        </Grid>

      {user && (
        <EditProfile
          setOpen={setOpen}
          open={open}
          refetch={refetch}
          user={user}
        />
      )}{" "}
    </Box>
  );
};

export default Profile;
