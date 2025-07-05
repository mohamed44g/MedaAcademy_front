// Drawer.tsx
"use client";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { ProfileSidebar } from "./ProfileSidebar";
import { useState } from "react";

export default function DrawerComponent({
  activeSection,
}: {
  activeSection: string;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Drawer
        anchor="right"
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 230,
            ...(isMobile && { top: "64px" }), // Adjust for header height
          },
        }}
      >
        <ProfileSidebar activeSection={activeSection} />
      </Drawer>
      {/* Pass the toggle function to the header via a global event or context */}
      {typeof window !== "undefined" &&
        window.dispatchEvent(
          new CustomEvent("drawerToggle", { detail: handleDrawerToggle })
        )}
    </>
  );
}
