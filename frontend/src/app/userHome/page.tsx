"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { setUser } from "@/store/slice";

import Leftbar from "../components/HomePage/Leftbar";
import PostRender from "../components/HomePage/PostRender";
// import Rightbar from "../components/Rightbar";
export default function User() {
  // const { setUser } = useUserStore();
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const dispatch =useDispatch()
  useEffect(() => {
    const fetchUserInfo=async()=>{
      try {
        const response = await fetch('http://localhost:5000/getProfile',
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
dispatch(setUser({ _id: { $oid: data.id }, name: data.name, email: data.email, profilePic: data.profilePic }))
        // setUser(data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    }
  fetchUserInfo();
}, []);
  return (
    <Box
      sx={{
        mt: 7,
        display: ["block", "flex", "flex"],
        flexDirection: ["column", "row", "row"],
        width: "100vw",
      }}
    >
      <Box sx={{ display: ["none", "none", "block"], width: "30%" }}>
        <Leftbar />
      </Box>
      <Box
        sx={{
          display: ["block", "block", "block"],
          width: ["100%", "90%", "40%"],
        }}
      >
        <PostRender />
      </Box>
      {/* <Box sx={{ display: ["none", "none", "block"], width: "30%" }}>
        <Rightbar />
      </Box> */}
    </Box>
  );
}
