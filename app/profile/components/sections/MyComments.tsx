"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid2,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import {
  Comment as CommentIcon,
  PlayCircleOutline,
  Schedule,
  Visibility,
  MoreVert,
} from "@mui/icons-material";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "@/lib/axiosClient";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

interface Comment {
  id: number;
  video_id: number;
  title: string;
  content: string;
  created_at: string;
}

interface MyCommentsProps {
  comments: Comment[];
}

export function MyComments() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  const {
    data: comments,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/comments/user");
      return response.data.data;
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mutation for deleting a comment
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await axiosInstance.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
    },
  });

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    commentId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleDeleteComment = () => {
    if (selectedCommentId) {
      deleteCommentMutation.mutate(selectedCommentId);
      handleMenuClose();
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            background: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
            boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
          }}
        >
          <CommentIcon sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "primary.main" }}
          >
            تعليقاتي ({comments?.length})
          </Typography>
          <Typography variant="body1" color="text.secondary">
            جميع التعليقات التي كتبتها على الفيديوهات
          </Typography>
        </Box>
      </Box>

      {comments?.length === 0 ? (
        <Card>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <CommentIcon
              sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              لم تكتب أي تعليق بعد
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, borderRadius: 3 }}
              component={Link}
              href="/courses"
            >
              تصفح الكورسات
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid2 container spacing={4}>
          {comments.map((comment: Comment) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={comment.id}>
              <Card
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Comment Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2,
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    <Box>
                      {" "}
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
                        }}
                      >
                        <CommentIcon />
                      </Avatar>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.6,
                          mb: 2,
                          maxWidth: "100%",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        {comment.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Schedule
                          sx={{ color: "text.secondary", fontSize: 16 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {formatDate(comment.created_at)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        justifySelf: "flex-end",
                        position: "absolute",
                        top: -25,
                        left: 10,
                      }}
                    >
                      <IconButton
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        onClick={(e) => handleMenuOpen(e, comment.id)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        width: "50%",
                        gap: 1,
                      }}
                    >
                      <PlayCircleOutline
                        sx={{ color: "primary.main", fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {comment.title}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      startIcon={<Visibility sx={{ ml: 1 }} />}
                      component={Link}
                      href={`/videos/${comment.video_id}`}
                      sx={{
                        borderRadius: 2,
                        color: "primary.main",

                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      مشاهدة الفيديو
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleDeleteComment} sx={{ color: "error.main" }}>
          حذف
        </MenuItem>
      </Menu>
    </Box>
  );
}
