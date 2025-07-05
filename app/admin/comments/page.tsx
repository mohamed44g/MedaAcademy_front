"use client"
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material"
import {
  Comment,
  CheckCircle,
  Cancel,
  Pending,
  Search,
  Visibility,
  Delete,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material"
import { useComments, useUpdateCommentStatus } from "../../../hooks/useAdmin"

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedComment, setSelectedComment] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const { data: comments } = useComments()
  const updateCommentStatusMutation = useUpdateCommentStatus()

  // Filter comments
  const filteredComments = comments?.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.course_title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const totalComments = comments?.length || 0
  const approvedComments = comments?.filter((comment) => comment.status === "approved").length || 0
  const pendingComments = comments?.filter((comment) => comment.status === "pending").length || 0
  const rejectedComments = comments?.filter((comment) => comment.status === "rejected").length || 0

  const handleStatusUpdate = (commentId: number, status: string) => {
    updateCommentStatusMutation.mutate({ commentId, status })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success"
      case "rejected":
        return "error"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle />
      case "rejected":
        return <Cancel />
      case "pending":
        return <Pending />
      default:
        return <Comment />
    }
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", direction: "rtl" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            إدارة التعليقات
          </Typography>
          <Typography variant="body1" color="text.secondary">
            مراجعة وإدارة تعليقات الطلاب على الكورسات
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <CardContent sx={{ color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {totalComments}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      إجمالي التعليقات
                    </Typography>
                  </Box>
                  <Comment sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
              <CardContent sx={{ color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {approvedComments}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      التعليقات المعتمدة
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
              <CardContent sx={{ color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {pendingComments}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      التعليقات المعلقة
                    </Typography>
                  </Box>
                  <Pending sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
              <CardContent sx={{ color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {rejectedComments}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      التعليقات المرفوضة
                    </Typography>
                  </Box>
                  <Cancel sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="البحث في التعليقات أو أسماء المستخدمين أو الكورسات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="تصفية حسب الحالة"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  <MenuItem value="approved">معتمد</MenuItem>
                  <MenuItem value="pending">في الانتظار</MenuItem>
                  <MenuItem value="rejected">مرفوض</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: 2, height: 56 }}
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }}
                >
                  إعادة تعيين
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Comments Table */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              قائمة التعليقات ({filteredComments?.length || 0})
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "grey.50" }}>
                    <TableCell sx={{ fontWeight: 600 }}>التعليق</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>المستخدم</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>الكورس</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>التقييم</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>الحالة</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>التاريخ</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredComments?.map((comment) => (
                    <TableRow key={comment.id} hover>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {comment.content}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {comment.user_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{comment.course_title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Rating value={comment.rating} readOnly size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(comment.status)}
                          label={
                            comment.status === "approved"
                              ? "معتمد"
                              : comment.status === "rejected"
                                ? "مرفوض"
                                : "في الانتظار"
                          }
                          color={getStatusColor(comment.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{comment.created_at}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setSelectedComment(comment)
                              setViewDialogOpen(true)
                            }}
                          >
                            <Visibility />
                          </IconButton>
                          {comment.status === "pending" && (
                            <>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleStatusUpdate(comment.id, "approved")}
                              >
                                <ThumbUp />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleStatusUpdate(comment.id, "rejected")}
                              >
                                <ThumbDown />
                              </IconButton>
                            </>
                          )}
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* View Comment Dialog */}
        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>تفاصيل التعليق</DialogTitle>
          <DialogContent>
            {selectedComment && (
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      المستخدم
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedComment.user_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      الكورس
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedComment.course_title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      التقييم
                    </Typography>
                    <Rating value={selectedComment.rating} readOnly />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      التاريخ
                    </Typography>
                    <Typography variant="body1">{selectedComment.created_at}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      التعليق
                    </Typography>
                    <Paper sx={{ p: 2, backgroundColor: "grey.50" }}>
                      <Typography variant="body1">{selectedComment.content}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      الحالة الحالية
                    </Typography>
                    <Chip
                      icon={getStatusIcon(selectedComment.status)}
                      label={
                        selectedComment.status === "approved"
                          ? "معتمد"
                          : selectedComment.status === "rejected"
                            ? "مرفوض"
                            : "في الانتظار"
                      }
                      color={getStatusColor(selectedComment.status) as any}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>إغلاق</Button>
            {selectedComment?.status === "pending" && (
              <>
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedComment.id, "approved")
                    setViewDialogOpen(false)
                  }}
                  variant="contained"
                  color="success"
                  startIcon={<ThumbUp />}
                >
                  اعتماد
                </Button>
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedComment.id, "rejected")
                    setViewDialogOpen(false)
                  }}
                  variant="contained"
                  color="error"
                  startIcon={<ThumbDown />}
                >
                  رفض
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
