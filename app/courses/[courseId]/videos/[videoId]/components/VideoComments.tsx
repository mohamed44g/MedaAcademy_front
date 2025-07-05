"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { CommentsList } from "./CommentsList";
import { CommentForm } from "./CommentForm";
import { CommentsPagination } from "./CommentsPagination";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosClient";

interface VideoCommentsProps {
  videoId: number;
}

const getComments = async (videoId: number, page: number) => {
  const response = await axiosInstance.get(`/comments/${videoId}`, {
    params: { page },
  });
  console.log("response", response);
  return response.data.data;
};

export function VideoComments({ videoId }: VideoCommentsProps) {
  const { isDarkMode } = useThemeContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: commentsData, refetch } = useQuery({
    queryKey: ["comments", videoId, currentPage],
    queryFn: async () => await getComments(videoId, currentPage),
  });
  console.log("commentsData", commentsData);
  const totalPages = Math.ceil(commentsData?.total / 6);

  const handleCommentAdded = () => {
    refetch();
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
        minHeight: "50vh",
      }}
    >
      {/* Comments Header */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? "#f9fafb" : "#1f2937",
            mb: 1,
          }}
        >
          التعليقات ({commentsData?.total})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          شارك رأيك واستفساراتك حول هذا الفيديو
        </Typography>
      </Box>

      {/* Add Comment Form */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <CommentForm videoId={videoId} onCommentAdded={handleCommentAdded} />
      </Box>

      {/* Comments List */}
      <Box sx={{ p: 3 }}>
        <CommentsList
          comments={commentsData?.comments}
          videoId={videoId}
          onReplay={() => refetch()}
        />
      </Box>

      {/* Pagination */}
        <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <CommentsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(currentPage: number) => setCurrentPage(currentPage)}
          />
        </Box>
    </Box>
  );
}
