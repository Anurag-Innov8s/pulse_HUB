"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';


const Leftbar = () => {
  const router = useRouter();

  const user = useSelector((state:any) => state.user.user);
  return (
    <Box
      sx={{
        width: "30vw",
        height: "100vh",
        display: ["none", "block", "flex"],
        p: 1,
        justifyContent: "flex-end",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: ["0%", "60%", "60%"],
          height: "35%",
          bgcolor: "white",
          borderRadius: "16px",
          p: 1,
          boxShadow: "0px 4px 10px rgb(80, 56, 237,0.3)",
          gap: 2,
        }}
      >
        <Box
          sx={{
            height: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          {user?.profilePic && (
            <Image
              src={user.profilePic}
              alt="profile-photo"
              width={150}
              height={150}
              style={{ borderRadius: "50%" }}
            />
          )}
        </Box>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          sx={{ textAlign: "center" }}
        >
          {user?.name}
        </Typography>
        {/* <Box
          sx={{
            height: "40%",
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
        {/* <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>500</Typography>
            <Typography>Followers</Typography>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>100</Typography>
            <Typography>Followings</Typography>
          </Typography> */}
        {/* <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>{user?.postCount}</Typography>
            <Typography>Posts</Typography>
          </Typography> */}
        {/* </Box> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              fontFamily: "Geist Mono, monospace",
              background:
                "linear-gradient(90deg, hsla(248, 84%, 73%, 1) 0%, hsla(248, 83%, 57%, 1) 100%)",
              boxShadow: "0px 8px 10px #5038ED",
            }}
            onClick={() => router.push("/profile")}
          >
            Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Leftbar;