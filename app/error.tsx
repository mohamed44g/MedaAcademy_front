"use client";
import { Box, Typography } from "@mui/material";

const ErrorPage = ({ error }: any) => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">{error?.message}</Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
