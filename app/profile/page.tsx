export const dynamic = "force-dynamic";
import { Container, Box } from "@mui/material";
import { UserInfo } from "./components/UserInfo";
import axiosInstance from "@/lib/axiosServer";

async function fetchUserData() {
  const response = await axiosInstance.get("/users");
  return response.data.data;
}

export default async function ProfilePage() {
  const userData = await fetchUserData();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <UserInfo user={userData} />
      </Container>
    </Box>
  );
}
