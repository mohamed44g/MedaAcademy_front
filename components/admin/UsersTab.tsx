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
} from "@mui/material"
import { MoreVert, Search, Person, Email, Phone, AdminPanelSettings, Block } from "@mui/icons-material"
import { useUsers, useUpdateUserRole, useUpdateUserStatus } from "../../hooks/useAdmin"
import type { User } from "../../lib/api/admin"

export default function UsersTab() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: users, isLoading, error } = useUsers()
  const updateRoleMutation = useUpdateUserRole()
  const updateStatusMutation = useUpdateUserStatus()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  const handleUpdateRole = (role: string) => {
    if (selectedUser) {
      updateRoleMutation.mutate({ userId: selectedUser.id, role })
    }
    handleMenuClose()
  }

  const handleUpdateStatus = (status: string) => {
    if (selectedUser) {
      updateStatusMutation.mutate({ userId: selectedUser.id, status })
    }
    handleMenuClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "banned":
        return "error"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "primary"
      case "user":
        return "default"
      default:
        return "default"
    }
  }

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedUsers = filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
        حدث خطأ في تحميل بيانات المستخدمين
      </Alert>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          إدارة المستخدمين
        </Typography>
        <TextField
          placeholder="البحث عن مستخدم..."
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
              <TableCell sx={{ fontWeight: 600 }}>البريد الإلكتروني</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الهاتف</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الدور</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الحالة</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>تاريخ التسجيل</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers?.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <Person />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role === "admin" ? "مدير" : "مستخدم"}
                    color={getRoleColor(user.role) as any}
                    size="small"
                    icon={user.role === "admin" ? <AdminPanelSettings /> : <Person />}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status === "active" ? "نشط" : user.status === "banned" ? "محظور" : "في الانتظار"}
                    color={getStatusColor(user.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{new Date(user.created_at).toLocaleDateString("ar-EG")}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, user)}>
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
        count={filteredUsers?.length || 0}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(Number.parseInt(e.target.value, 10))}
        labelRowsPerPage="عدد الصفوف في الصفحة:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleUpdateRole("admin")}>
          <AdminPanelSettings sx={{ mr: 1 }} />
          جعل مدير
        </MenuItem>
        <MenuItem onClick={() => handleUpdateRole("user")}>
          <Person sx={{ mr: 1 }} />
          جعل مستخدم عادي
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("active")}>
          <Person sx={{ mr: 1 }} />
          تفعيل الحساب
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus("banned")}>
          <Block sx={{ mr: 1 }} />
          حظر المستخدم
        </MenuItem>
      </Menu>
    </Box>
  )
}
