"use client";
import { useState } from "react";
import type React from "react";

import { Box, TextField, Button, Avatar } from "@mui/material";
import { Send, Cancel } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosClient";

interface ReplyFormProps {
  commentId: number;
  videoId: number;
  onReplyAdded: () => void;
  onCancel: () => void;
}

export function ReplyForm({
  commentId,
  videoId,
  onReplyAdded,
  onCancel,
}: ReplyFormProps) {
  const { isDarkMode } = useThemeContext();
  const [reply, setReply] = useState("");

  const addReplyMutation = useMutation({
    mutationFn: async (replyData: { content: string }) => {
      // Simulate API call
      const response = await axiosInstance.post(
        `/comments/${commentId}/replies`,
        replyData
      );
      return response.data;
    },
    onSuccess: () => {
      setReply("");
      onReplyAdded();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim()) {
      addReplyMutation.mutate({
        content: reply.trim(),
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(0, 0, 0, 0.02)",
        borderRadius: 3,
        p: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar src={""} alt="أنت" sx={{ width: 36, height: 36 }} />
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="اكتب ردك هنا..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                type="button"
                variant="outlined"
                startIcon={<Cancel />}
                onClick={onCancel}
                disabled={addReplyMutation.isPending}
                sx={{ borderRadius: 25 }}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
                disabled={!reply.trim() || addReplyMutation.isPending}
                sx={{
                  borderRadius: 25,
                  background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: `0 8px 20px #1784ad30`,
                  },
                }}
              >
                {addReplyMutation.isPending ? "جاري الإرسال..." : "رد"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
