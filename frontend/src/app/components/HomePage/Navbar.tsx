"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Navbar = () => {
  const router = useRouter();
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "70px",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        p:2
      }}
      style={{ minHeight: "48px" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily={"Geist Mono, monospace"}
        style={{
          cursor: "pointer",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          color: "#8418F6",
        }}
        onClick={() => {
          if (localStorage.getItem("token")) {
            router.push("/userHome");
            router.refresh();
          } else {
            router.push("/");
            router.refresh();
          }
        }}
      >
        PulseHub
      </Typography>
      {isLoggedIn ? (
        <Stack direction="row" spacing={2}>
          <Typography
            fontWeight="bold"
            variant="h5"
            fontFamily={"Geist Mono, monospace"}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#8418F6", transform: "scale(1.15)" },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={() => {
              router.push("/profile");
              router.refresh();
            }}
          >
            <AccountCircleIcon />
            Profile
          </Typography>
          <Typography
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
              router.refresh();
              toast.success("Logout Successfully", {
                duration: 1000,
              });
            }}
            fontWeight="bold"
            variant="h5"
            fontFamily={"Geist Mono, monospace"}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#8418F6", transform: "scale(1.15)" },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <LogoutIcon />
            Logout
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography
            onClick={() => {
              router.push("/signin");
            }}
            fontWeight="bold"
            variant="h5"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#8418F6", transform: "scale(1.15)" },
            }}
            fontFamily={"Geist Mono, monospace"}
          >
            SignIn
          </Typography>
          <Typography
            fontWeight="bold"
            variant="h5"
            alignItems={"center"}
            onClick={() => {
              router.push("/signup");
            }}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#8418F6", transform: "scale(1.15)" },
            }}
            fontFamily={"Geist Mono, monospace"}
          >
            SignUp
          </Typography>
        </Stack>
      )}
    </Toolbar>
  );
};
