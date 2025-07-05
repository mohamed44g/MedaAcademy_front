"use client";
import { useState } from "react";
import type React from "react";

import { Box, TextField, Button, Avatar } from "@mui/material";
import { Send, Cancel } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosClient";

interface CommentFormProps {
  videoId: number;
  onCommentAdded: () => void;
}

export function CommentForm({ videoId, onCommentAdded }: CommentFormProps) {
  const { isDarkMode } = useThemeContext();
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const addCommentMutation = useMutation({
    mutationFn: async (commentData: { video_id: number; content: string }) => {
      const response = await axiosInstance.post(`/comments`, commentData);
      return response.data;
    },
    onSuccess: () => {
      setComment("");
      setIsExpanded(false);
      onCommentAdded();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addCommentMutation.mutate({
        video_id: videoId,
        content: comment.trim(),
      });
    }
  };

  const handleCancel = () => {
    setComment("");
    setIsExpanded(false);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Avatar src={""} alt={""} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={isExpanded ? 4 : 1}
            placeholder="اكتب تعليقك هنا..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            sx={{
              mb: isExpanded ? 2 : 0,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.05)",
              },
            }}
          />

          {isExpanded && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                type="button"
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                disabled={addCommentMutation.isPending}
                sx={{ borderRadius: 25 }}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
                disabled={!comment.trim() || addCommentMutation.isPending}
                sx={{
                  borderRadius: 25,
                  background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 8px 20px #1784ad30`,
                  },
                }}
              >
                {addCommentMutation.isPending ? "جاري الإرسال..." : "تعليق"}
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
}
