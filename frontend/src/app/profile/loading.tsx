import { Box, Typography } from "@mui/material";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
       <Box sx={{width:"100%", height:"100%" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography sx={{fontSize:"100px" }}>Loding</Typography>
       </Box>
        )
  }