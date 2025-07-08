// layout.tsx
import { Container, Box } from "@mui/material";
import { headers } from "next/headers";
import ProfileHeader from "./components/profileHeader";
import DrawerComponent from "./components/Drawer";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/profile";

  // Extract active section from pathname
  const getActiveSection = (path: string) => {
    if (path === "/profile" || path === "/profile/") return "info";
    const segments = path.split("/");
    return segments[segments.length - 1] || "info";
  };

  const activeSection = getActiveSection(pathname);
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          width: "100%",
          // pt: 2,
        }}
      >
        <ProfileHeader />
        <DrawerComponent activeSection={activeSection} />
        <Container
          maxWidth="md"
          sx={{
            mt: 10,
            ml: "250px",
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
}
