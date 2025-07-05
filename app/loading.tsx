import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress size={48} color="primary" />
      <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
        جاري تحميل البيانات...
      </Typography>
    </Box>
  );
}
