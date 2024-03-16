import { Box, Typography } from "@mui/material";
import Image from "next/image";

import logo from "./images/images.jpeg";
const Rightbar = () => {
  return (
    <Box
      sx={{
        width: "30vw",
        height: "100vh",
        display: ["none", "block", "flex"],
        p: 1,
        justifyContent: "flex-start",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: ["0%", "60%", "60%"],
          height: "50%",
          bgcolor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography fontSize={"30px"} fontWeight={"bold"}>
            Friends List
          </Typography>
        </Box>
        <Box>
          {" "}
          <Box
            sx={{
              width: "80%",
              maxHeigth: "40px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              ml: 2,
            }}
          >
            <Image
              src={logo}
              width={35}
              height={35}
              alt="friend-picture"
              style={{ borderRadius: "50%" }}
            ></Image>
            <Typography>UserName</Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              maxHeigth: "40px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              ml: 2,
              mt: 2,
            }}
          >
            <Image
              src={logo}
              width={35}
              height={35}
              alt="friend-picture"
              style={{ borderRadius: "50%" }}
            ></Image>
            <Typography>UserName</Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              maxHeigth: "40px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              ml: 2,
              mt: 2,
            }}
          >
            <Image
              src={logo}
              width={35}
              height={35}
              alt="friend-picture"
              style={{ borderRadius: "50%" }}
            ></Image>
            <Typography>UserName</Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              maxHeigth: "40px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              ml: 2,
              mt: 2,
            }}
          >
            <Image
              src={logo}
              alt="friend-picture"
              width={35}
              height={35}
              style={{ borderRadius: "50%" }}
            ></Image>
            <Typography>UserName</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Rightbar;
