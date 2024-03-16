import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Badge, Box, TextField, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export default function PostCard(props: any) {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const addLike = async (postId: any) => {
    try {
      const response = await fetch(`http://localhost:5000/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({postId}),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        console.log("liked");
      }
    } catch (err) {
      console.log(err);
    }
    return postId;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "94%",
        backgroundColor: "white",
        borderRadius: "16px",
        maxHeight: "70%",
        p: 2,
        gap: 1,
        marginLeft: "16px",
        boxShadow: "0px 4px 10px rgb(80, 56, 237,0.3)",
      }}
    >
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            maxHeight: "45px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            src={props.profilePic}
            alt="profile"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              marginLeft: "2px",
            }}
          ></Image>
          <Typography sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
            <Typography
              fontWeight={"bold"}
              fontFamily={"Geist Mono, monospace"}
            >
              {props.name}
            </Typography>
            <Typography
              fontSize={"12px"}
              color={"#949292"}
              fontFamily={"Geist Mono, monospace"}
            >
              {formatDistanceToNow(props.createdAt, { addSuffix: true })}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "60px",
            overflow: "auto",
            minHeight: "20px",
            ml: 1,
          }}
        >
          <Typography fontFamily={"Geist Mono, monospace"}>
            {props.body}
          </Typography>
        </Box>
      </Box>
      {props.photo ? (
        <Box
          sx={{
            height: "320px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src={props.photo}
            alt="post-picture"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "auto",
              height: "100%",
              borderRadius: "16px",
              boxShadow: "0px 4px 10px rgb(80, 56, 237,0.2)",
            }}
          />
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            m: "1px",
            flexDirection: "row",
            gap: 2,
            p: "2px",
            paddingBottom: "4px",
          }}
        >
          <Badge badgeContent={props.likeCount} color="primary">
            <FavoriteBorderRoundedIcon
              sx={{ cursor: "pointer" }}
              fontSize="medium"
              onClick={() => addLike(props.postId)}
            />
          </Badge>
          <CommentIcon fontSize="medium" />
        </Box>
        <Box
          sx={{
            height: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          {props?.userProfilepic && (
            <Image
              src={props.userProfilepic}
              alt="profile"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
          )}
          <TextField
            size="small"
            type="text"
            sx={{
              width: "100%",
              height: "%",
              borderRadius: "25px",
              bgcolor: "#F0EDFF",
              fontFamily: "Geist Mono, monospace",
              border: "none",
              fontSize: "15px",
              "& fieldset": { border: "none" },
            }}
            placeholder="Write Your Comment"
          />
          <Typography
            sx={{
              cursor: "pointer",
              color: "#8418F6",
              fontWeight: "bold",
              fontFamily: "Geist Mono, monospace",
            }}
          >
            Post
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
