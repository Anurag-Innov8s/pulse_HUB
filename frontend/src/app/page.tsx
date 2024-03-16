"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import img from "./components/images/bgs.jpg";

export default function Home() {
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  if (token) {
    return router.push("/userHome");
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: ["100%", "100vw", "100vw"],
        height: ["100%", "97vh", "97vh"],
        flexDirection: ["column", "row", "row"],
      }}
    >
      <Box
        sx={{
          justifyContent: ["", "", "center"],
          display: "flex",
          width: ["100%", "50%", "50%"],
          height: ["50%", "100%", "100%"],
        }}
      >
        <Stack spacing={1} sx={{ mt: [10, 24, 24], zIndex: 1000, ml: 1 }}>
          <Typography
            variant="h3"
            fontFamily={"Geist Mono, monospace"}
            color={"#8418F6"}
            sx={{
              "@media (max-width:600px)": {
                fontSize: "2rem",
              },
            }}
          >
            Welcome To
          </Typography>
          <Stack direction="row" spacing={0}>
            <Typography
              variant="h1"
              fontFamily={"Geist Mono, monospace"}
              fontWeight="bolder"
              sx={{
                "@media (max-width:600px)": {
                  fontSize: "4rem",
                },
              }}
            >
              Pulse
            </Typography>
            <Typography
              variant="h1"
              fontWeight="bolder"
              fontFamily={"Geist Mono, monospace"}
              color={"#8418F6"}
              sx={{
                "@media (max-width:600px)": {
                  fontSize: "4rem",
                },
              }}
            >
              Hub
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              fontSize: "16px",
              mb: 2,
              fontWeight: "bold",
              background:
                "linear-gradient(90deg, hsla(248, 84%, 73%, 1) 0%, hsla(248, 83%, 57%, 1) 100%)",
              alignSelf: "start",
              borderRadius: "14px",
              boxShadow: "0px 8px 12px #5038ED",
            }}
            onClick={() => {
              router.push("/signup");
            }}
          >
            Join Now
          </Button>
        </Stack>
      </Box>
      <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: ["50%", "100%", "100%"],
            width:["100%","50%","50%"]
          }}
        >
          <Image
            src={img}
            priority={true}
            alt="home-picture"
            style={{ width: "100%", height: "100vh" }}
          ></Image>
        </Box>
    </Box>
  );
}
