"use client"
import { useState } from "react"
import type React from "react"

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  TablePagination,
  CircularProgress,
  Alert,
  Avatar,
} from "@mui/material"
import { MoreVert, Search, Check, Close, Delete, Comment } from "@mui/icons-material"
import { useComments, useUpdateCommentStatus } from "../../hooks/useAdmin"
import type { Comment as CommentType } from "../../lib/api/admin"

export default function CommentsTab() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: comments, isLoading, error } = useComments()
  const updateStatusMutation = useUpdateCommentStatus()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, comment: CommentType) => {
    setAnchorEl(event.currentTarget)
    setSelectedComment(comment)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedComment(null)
  }

  const handleUpdateStatus = (status: string) => {
    if (selectedComment) {
      updateStatusMutation.mutate({ commentId: selectedComment.id, status })
    }
    handleMenuClose()
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "موافق عليه"
      case "rejected":
        return "مرفوض"
      case "pending":
        return "في الانتظار"
      default:
        return status
    }
  }

  const filteredComments = comments?.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.video_title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedComments = filteredComments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        حدث خطأ في تحميل التعليقات
      </Alert>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          إدارة التعليقات
        </Typography>
        <TextField
          placeholder="البحث في التعليقات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(23, 132, 173, 0.1)" }}>
              <TableCell sx={{ fontWeight: 600 }}>المستخدم</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الفيديو</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>التعليق</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الحالة</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>التاريخ</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedComments?.map((comment) => (
              <TableRow key={comment.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "primary.main" }}>
                      {comment.user_name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {comment.user_name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {comment.video_title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {comment.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(comment.status)}
                    color={getStatusColor(comment.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{new Date(comment.created_at).toLocaleDateString("ar-EG")}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredComments?.length || 0}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(Number.parseInt(e.target.value, 10))}
        labelRowsPerPage="عدد الصفوف في الصفحة:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleUpdateStatus("approved")}>
          <Check sx={{ mr: 1, color: "success.main" }} />
          الموافقة على التعليق
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("rejected")}>
          <Close sx={{ mr: 1, color: "error.main" }} />
          رفض التعليق
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("pending")}>
          <Comment sx={{ mr: 1, color: "warning.main" }} />
          وضع في الانتظار
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("deleted")}>
          <Delete sx={{ mr: 1, color: "error.main" }} />
          حذف التعليق
        </MenuItem>
      </Menu>
    </Box>
  )
}
