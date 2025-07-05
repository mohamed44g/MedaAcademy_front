"use client"
import { Box, Typography, Card, CardContent, Grid2, Chip, Avatar } from "@mui/material"
import { Comment as CommentIcon, PlayCircleOutline, Schedule } from "@mui/icons-material"
import { useThemeContext } from "@/contexts/ThemeContext"

interface Comment {
  id: number
  content: string
  created_at: string
  video_title: string
  course_title: string
}

interface MyCommentsProps {
  comments: Comment[]
}

export function MyComments({ comments }: MyCommentsProps) {
  const { isDarkMode } = useThemeContext()

  if (!comments || comments.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          لم تكتب أي تعليق بعد
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: isDarkMode ? "#f9fafb" : "#1f2937",
          mb: 3,
          textAlign: "center",
        }}
      >
        تعليقاتي ({comments.length})
      </Typography>

      <Grid2 container spacing={3}>
        {comments.map((comment) => {
          const formattedDate = new Date(comment.created_at).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          return (
            <Grid2 size={{ xs: 12, md: 6 }} key={comment.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.9)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 24px #1784ad20`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                      }}
                    >
                      <CommentIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: isDarkMode ? "#f9fafb" : "#1f2937",
                          mb: 1,
                          lineHeight: 1.6,
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
                          sx={{
                            color: "text.secondary",
                            fontSize: 16,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {formattedDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PlayCircleOutline
                        sx={{
                          color: "primary.main",
                          fontSize: 18,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {comment.video_title}
                      </Typography>
                    </Box>
                    <Chip
                      label={comment.course_title}
                      size="small"
                      sx={{
                        alignSelf: "flex-start",
                        background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          )
        })}
      </Grid2>
    </Box>
  )
}
