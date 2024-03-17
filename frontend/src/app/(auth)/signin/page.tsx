"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import img from "../bgimage.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://pulse-hub-zdc2.vercel.app/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        toast.success("Login Successfully", {
          duration: 1000,
        });
        router.push("/userHome");
        router.refresh();
      }
    } catch (error) {
      toast.error(`${error}`, {
        duration: 1000,
      });
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: ["86%","85%","75%"],
          width: ["95%","75%","75%"],
          display: "flex",
          flexDirection: ["column-reverse", "row", "row"],
          borderRadius: "24px",
          boxShadow: "0px 12px 50px #9181F4",
        }}
      >
        <Box
          sx={{
            width: ["100%", "50%", "50%"],
            height: ["50%", "100%", "100%"],
            display: "flex",
            justifyContent: "center",
            mt:[0,0,3]
          }}
        >
          <Box
            sx={{
              width: ["100%", "100%", "60%"],
              height: ["100%", "100%", "50%"],
              display: "flex",
              flexDirection: "column",

              pt: [0, 25, 0],
              gap: [0, 1, 2],
            }}
          >
            <Typography
              variant="h3"
              fontWeight={"bold"}
              fontFamily={"Geist Mono, monospace"}
              sx={{ textAlign: "center", color: "#8418F6" }}
            >
              LOGIN
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                border: "none",
                borderRadius: "24px",
                "& fieldset": { border: "none" },
                bgcolor: "#F0EDFF",
                fontFamily: "Geist Mono, monospace",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: {
                  border: "none",
                  fontFamily: "Geist Mono, monospace",
                  "& fieldset": { border: "none" },
                  bgcolor: "#F0EDFF",
                  borderRadius: "24px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                fontFamily: "Geist Mono, monospace",
                background:
                  "linear-gradient(90deg, hsla(248, 84%, 73%, 1) 0%, hsla(248, 83%, 57%, 1) 100%)",
                alignSelf: "center",
                borderRadius: "14px",
                boxShadow: "0px 8px 12px #5038ED",
                mb: 2,
              }}
              onClick={handleSubmit}
            >
              Login Now
            </Button>

            <Typography
              textAlign={"center"}
              fontFamily={"Geist Mono, monospace"}
            >
              {" "}
              ---------Dont Have Account ?---------{" "}
            </Typography>
            <Typography
              textAlign={"center"}
              variant="h6"
              fontWeight={"bold"}
              sx={{
                color: "#7D55F5",
                cursor: "pointer",
                fontFamily: "Geist Mono, monospace",
              }}
              onClick={() => router.push("/signup")}
            >
              SignUp
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: ["100%", "50%", "50%"],
            height: ["50%", "100%", "100%"],
          }}
        >
          <Image
            src={img}
            alt="side-picture"
            style={{ width: "100%", height: "100%", borderRadius: "24px" }}
          ></Image>
        </Box>
      </Box>
    </Box>
  );
};
export default SignIn;
