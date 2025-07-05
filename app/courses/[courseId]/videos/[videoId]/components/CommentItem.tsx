"use client";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { Reply, AccessTime } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";

interface CommentItemProps {
  comment: any;
  onReplyClick: () => void;
  isReplyFormOpen: boolean;
}

export function CommentItem({
  comment,
  onReplyClick,
  isReplyFormOpen,
}: CommentItemProps) {
  const { isDarkMode } = useThemeContext();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box>
      {/* Main Comment */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Avatar
          src={comment.user.avatar}
          alt={comment.user.name}
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
              borderRadius: 3,
              p: 3,
              mb: 1,
              width: "100%",
              height: "fit-content",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                mb: 1,
              }}
            >
              {comment.user.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? "#e5e7eb" : "#374151",
                lineHeight: 1.6,
                wordBreak: "break-word",
              }}
            >
              {comment.content}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "text.secondary",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {formatDate(comment.createdAt)}
              </Typography>
            </Box>

            <Button
              size="small"
              startIcon={<Reply />}
              onClick={onReplyClick}
              sx={{
                color: isReplyFormOpen ? "primary.main" : "text.secondary",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              رد ({comment.replies.length})
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Replies */}
      {comment.replies.length > 0 && isReplyFormOpen && (
        <Box
          sx={{
            mr: 6,
            borderRight: "2px solid",
            borderColor: "divider",
            pr: 3,
          }}
        >
          {comment.replies.map((reply: any) => (
            <Box key={reply.id} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Avatar
                src={reply.user.avatar}
                alt={reply.user.name}
                sx={{ width: 36, height: 36 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.03)"
                      : "rgba(0, 0, 0, 0.03)",
                    borderRadius: 2,
                    p: 2,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: isDarkMode ? "#f9fafb" : "#1f2937",
                      mb: 0.5,
                      fontSize: "0.875rem",
                    }}
                  >
                    {reply.user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? "#e5e7eb" : "#374151",
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                    }}
                  >
                    {reply.content}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "text.secondary",
                  }}
                >
                  <AccessTime sx={{ fontSize: 14 }} />
                  <Typography variant="caption">
                    {formatDate(reply.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
