"use client";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, Button, Input, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "sonner";

import PostCard from "../components/Post/PostCard";
const API_BASE_URL = "http://localhost:5000";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/pulsehubcloud/image/upload";
const UPLOAD_PRESET = "pulsehub";
const CLOUD_NAME = "pulsehubcloud";

const containerStyle = {
  mt: 7,
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  height: "100%",
  alignItems: "center",
  position: "relative",
  gap: 1,
};
export default function page() {
  return <UserPost />;
}

function UserPost() {
  const user = useSelector((state:any) => state.user.user);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showImage, setShowImage] = useState("");

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setShowImage(result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/myPosts?page=1&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.length === 0 || data.length < limit) {
        setNoMorePosts(true);
      }

      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateProfile = async () => {
    let CldData: any;
    let profilePic: any;
    const formData = new FormData();

    if (selectedImage) {
      formData.append("file", selectedImage);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);

      try {
        const cloudResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        CldData = await cloudResponse.json();
        profilePic = CldData.url;
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/uploadProfilePic`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePic }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error, { duration: 1000 });
      } else {
        toast.success(data.success, { duration: 1000 });

      }

      setSelectedImage(null);
      location.reload();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          width: ["100%", "60%", "40%"],
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "94%",
            height: "40%",
            bgcolor: "white",
            display: "flex",
            borderRadius: "12px",
            flexDirection: "column",
            p: 2,
            alignSelf: "center",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {user?.profilePic && (
            <Image
              src={user.profilePic}
              alt="profile-photo"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          )}

          <Button component="label" sx={{ color: "black" }}>
            <EditRoundedIcon />
            <Input
              type="file"
              onChange={handleImageChange}
              sx={{ display: "none" }}
            />
          </Button>
          {selectedImage && (
            <>
              <Image
                src={showImage}
                alt="post-picture"
                width={100}
                height={100}
                style={{ borderRadius: "16px" }}
              ></Image>
              <Button
                variant="contained"
                onClick={updateProfile}
                sx={{ bgcolor: "black" }}
              ></Button>
            </>
          )}

          <Typography fontWeight={"bold"}>{user?.name}</Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
              gap: 3,
            }}
          >
            {/* <Typography>500 Followers</Typography>
            <Typography>500 Followings </Typography> */}
            <Typography>{posts.length} Posts </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {posts.map((post: any, index: number) => (
            <PostCard
              key={post.id || index}
              name={post.postedBy.name}
              profilePic={post.postedBy.profilePic}
              createdAt={post.createdAt}
              body={post.body}
              photo={post.photo}
              userProfilepic={user?.profilePic}
              // Add other props as needed
            />
          ))}
          {noMorePosts ? (
            <Typography sx={{ textAlign: "center" }}>
              No More Post ..
            </Typography>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setLimit(limit + 5);
                setPage(page + 1);
                fetchData();
              }}
              sx={{
                width: ["30%", "25%", "25%"],
                marginLeft: "35%",
                bgcolor: "black",
              }}
            >
              Load More
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
