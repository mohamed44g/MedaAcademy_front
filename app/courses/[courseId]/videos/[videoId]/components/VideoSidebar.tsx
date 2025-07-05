"use client";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  Divider,
} from "@mui/material";
import {
  PlayArrow,
  CheckCircle,
  PlayCircleOutline,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";

interface VideoSidebarProps {
  videoData: any;
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export function VideoSidebar({
  videoData,
  open,
  onClose,
  isMobile,
}: VideoSidebarProps) {
  const theme = useTheme();
  const params = useParams();
  console.log(videoData);

  const SidebarContent = () => (
    <Box
      sx={{
        width: isMobile ? "100%" : 350,
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Mobile Header */}
      {isMobile && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h6">محتويات الكورس</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
        </>
      )}

      {/* Course Info */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {videoData.course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {videoData.course.instructor}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          التخصص: {videoData.course.specialty}
        </Typography>
      </Box>

      {/* Chapter Info */}
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          الفصل: {videoData.chapter.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {videoData.chapter.videos.length} فيديو
        </Typography>
      </Box>

      {/* Video List */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <List dense sx={{ p: 1 }}>
          {videoData.chapter.videos.map((video: any, index: number) => (
            <ListItem
              key={video.id}
              component={Link}
              href={`/courses/${params.courseId}/videos/${video.id}`}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: video.isActive
                  ? theme.palette.primary.main + "20"
                  : "transparent",
                border: video.isActive
                  ? `2px solid ${theme.palette.primary.main}`
                  : "1px solid transparent",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemIcon>
                {video.isCompleted ? (
                  <CheckCircle color="success" />
                ) : video.isActive ? (
                  <PlayArrow color="primary" />
                ) : (
                  <PlayCircleOutline color="action" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: video.isActive ? 600 : 400,
                      color: video.isActive
                        ? theme.palette.primary.main
                        : "text.primary",
                    }}
                  >
                    {index + 1}. {video.title}
                  </Typography>
                }
                secondary={video.duration}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { width: "100%", maxWidth: 400 },
        }}
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Box sx={{ borderRight: "1px solid", borderColor: "divider" }}>
      <SidebarContent />
    </Box>
  );
}
