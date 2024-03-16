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

import ProtectedRoute from "@/app/components/ProtectedRoute";

import img from "../bgimage.jpg";
/* eslint-disable */
const emailrex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passrex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async () => {
    if (!emailrex.test(email)) {
      return toast.error("Enter Valid Email", {
        duration: 1000,
      });
    } else if (!passrex.test(password)) {
      return toast.error(
        "Password should be 8 characters long and must contain Uppercase, Lowercase, Number, and Special Character",
        {
          duration: 1000,
        }
      );
    }
    try {
      const response = await fetch("http://localhost:5000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.error)
        return toast.error(data.error, {
          duration: 1000,
        });
      else
        toast.success(data.success, {
          duration: 1000,
        });

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <ProtectedRoute>
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
              height: ["60%", "100%", "100%"],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: ["100%", "100%", "60%"],
                height: ["100%", "100%", "70%"],
                display: "flex",
                flexDirection: "column",
                p: 1,
                pt: [0, 25, 0],
                gap: [0, 1, 2],
              }}
            >
              <Typography
                variant="h3"
                fontWeight={"bold"}
                sx={{
                  textAlign: "center",
                  fontFamily: "Geist Mono, monospace",
                  color: "#8418F6",
                }}
              >
                WELCOME
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  border: "none",
                  borderRadius: "24px",
                  "& fieldset": { border: "none" },
                  bgcolor: "#F0EDFF",
                }}
              />
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
                  background:
                    "linear-gradient(90deg, hsla(248, 84%, 73%, 1) 0%, hsla(248, 83%, 57%, 1) 100%)",
                  alignSelf: "center",
                  borderRadius: "14px",
                  boxShadow: "0px 8px 12px #5038ED",
                  fontFamily: "Geist Mono, monospace",
                  mb: 2,
                }}
                onClick={handleSubmit}
              >
                SignUp Now
              </Button>

              <Typography
                textAlign={"center"}
                fontFamily={"Geist Mono, monospace"}
              >
                {" "}
                ----------Have an Account ?----------{" "}
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
                onClick={() => router.push("/signin")}
              >
                SignIn
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: ["100%", "50%", "50%"],
              height: ["40%", "100%", "100%"],
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
    </ProtectedRoute>
  );
};

export default SignUp;
