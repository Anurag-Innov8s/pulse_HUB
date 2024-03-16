"use client";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CreatePost from "../Post/CreatePost";
import PostCard from "../Post/PostCard";
import ProtectedRoute from "../ProtectedRoute";
type posttype = any;
const PostRender = () => {
  const [posts, setPosts] = useState<posttype[]>([]);
  const [page, setPage] = useState(1);
  const [noMorePosts, setNoMorePosts] = useState(false);

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getPosts?page=${page}&limit=5`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.length === 0 || data.length < 5) {
          setNoMorePosts(true);
        }
        const suffledArray = shuffleArray(data);
        setPosts((prevPosts) => [...prevPosts, ...suffledArray]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);
  return (
    <ProtectedRoute>
      <Box
        component="section"
        sx={{
          width: ["100%", "100%", "100%"],
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          justifyContent: "center",
          p: 1,
          gap: 2,
        }}
      >
        <CreatePost></CreatePost>
        {posts.map((post: any, index: number) => (
          <PostCard
            key={post.id || index}
            name={post.postedBy.name}
            profilePic={post.postedBy.profilePic}
            createdAt={post.createdAt}
            body={post.body}
            photo={post.photo}
            likeCount={post.likes.length}
           postId={post._id}
          />
        ))}
        {noMorePosts ? (
          <Typography sx={{ textAlign: "center" }}>No More Post ..</Typography>
        ) : (
          <Button
            variant="contained"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setPage((page) => page + 1);
            }}
            sx={{
              width: ["30%", "30%", "25%"],
              marginLeft: "35%",
              bgcolor: "black",
            }}
          >
            Load More
          </Button>
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default PostRender;
