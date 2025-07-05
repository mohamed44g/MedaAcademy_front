"use client";
import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { VideoPlayer } from "./VideoPlayer";
import { VideoSidebar } from "./VideoSidebar";
import { VideoComments } from "./VideoComments";
import { VideoMobileHeader } from "./VideoMobileHeader";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosClient";

interface VideoPlayerLayoutProps {
  videoData: {
    id: number;
    title: string;
    signedUrl: string;
    keyUrl: string;
    duration: string;
    durationInSeconds: number;
    isCompleted: boolean;
    chapter: {
      id: number;
      title: string;
      videos: Array<{
        id: number;
        title: string;
        duration: string;
        isCompleted: boolean;
      }>;
    };
    course: {
      id: number;
      title: string;
      instructor: string;
      specialty: string;
    };
  };
}

export function VideoPlayerLayout({ videoData }: VideoPlayerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data, mutate } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/videos/${videoData.id}/finish`
      );
      return response.data;
    },
  });

  if (!videoData.isCompleted) {
    setTimeout(() => {
      mutate();
    }, videoData.durationInSeconds * 1000);
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <VideoSidebar
          videoData={videoData}
          open={true}
          onClose={() => {}}
          isMobile={false}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <VideoSidebar
          videoData={videoData}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
        />
      )}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <VideoMobileHeader
          title={videoData.title}
          onMenuClick={isMobile ? () => setSidebarOpen(true) : () => {}}
        />
        <VideoPlayer videoData={videoData} />
        <VideoComments videoId={videoData.id} />
      </Box>
    </Box>
  );
}
