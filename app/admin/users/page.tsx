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
} from "@mui/material"
import { People, PersonAdd, School, AdminPanelSettings, Search, Edit, Delete, Visibility } from "@mui/icons-material"
import { useUsers, useUpdateUserRole } from "../../../hooks/useAdmin"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState("")

  const { data: users } = useUsers()
  const updateUserRoleMutation = useUpdateUserRole()

  // Filter users
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  // Stats
  const totalUsers = users?.length || 0
  const activeUsers = users?.filter((user) => user.status === "active").length || 0
  const students = users?.filter((user) => user.role === "student").length || 0
  const instructors = users?.filter((user) => user.role === "instructor").length || 0

  const handleRoleChange = () => {
    if (selectedUser && newRole) {
      updateUserRoleMutation.mutate({
        userId: selectedUser.id,
        role: newRole,
      })
      setRoleDialogOpen(false)
      setSelectedUser(null)
      setNewRole("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "error"
      case "instructor":
        return "warning"
      case "student":
        return "primary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "default"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <AdminPanelSettings />
      case "instructor":
        return <School />
      case "student":
        return <People />
      default:
        return <People />
    }
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", direction: "rtl" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            إدارة المستخدمين
          </Typography>
          <Typography variant="body1" color="text.secondary">
            إدارة وتنظيم حسابات المستخدمين والأدوار
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
                      {totalUsers}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      إجمالي المستخدمين
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 40, opacity: 0.8 }} />
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
                      {activeUsers}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      المستخدمين النشطين
                    </Typography>
                  </Box>
                  <PersonAdd sx={{ fontSize: 40, opacity: 0.8 }} />
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
                      {students}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      الطلاب
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 40, opacity: 0.8 }} />
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
                      {instructors}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      المدرسين
                    </Typography>
                  </Box>
                  <School sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
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
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  select
                  label="تصفية حسب الدور"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الأدوار</MenuItem>
                  <MenuItem value="student">طالب</MenuItem>
                  <MenuItem value="instructor">مدرس</MenuItem>
                  <MenuItem value="admin">مدير</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  select
                  label="تصفية حسب الحالة"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">جميع الحالات</MenuItem>
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                  <MenuItem value="pending">في الانتظار</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="contained" startIcon={<PersonAdd />} sx={{ borderRadius: 2, height: 56 }}>
                  إضافة مستخدم
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              قائمة المستخدمين ({filteredUsers?.length || 0})
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "grey.50" }}>
                    <TableCell sx={{ fontWeight: 600 }}>المستخدم</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>الدور</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>التخصص</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>الحالة</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>تاريخ التسجيل</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers?.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.phone}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={user.role === "admin" ? "مدير" : user.role === "instructor" ? "مدرس" : "طالب"}
                          color={getRoleColor(user.role) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.specialty}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            user.status === "active" ? "نشط" : user.status === "inactive" ? "غير نشط" : "في الانتظار"
                          }
                          color={getStatusColor(user.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.created_at}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="warning"
                            onClick={() => {
                              setSelectedUser(user)
                              setNewRole(user.role)
                              setRoleDialogOpen(true)
                            }}
                          >
                            <Edit />
                          </IconButton>
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

        {/* Role Change Dialog */}
        <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>تغيير دور المستخدم</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                تغيير دور المستخدم: <strong>{selectedUser?.name}</strong>
              </Typography>
              <TextField
                fullWidth
                select
                label="الدور الجديد"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <MenuItem value="student">طالب</MenuItem>
                <MenuItem value="instructor">مدرس</MenuItem>
                <MenuItem value="admin">مدير</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRoleDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleRoleChange} variant="contained" disabled={updateUserRoleMutation.isPending}>
              {updateUserRoleMutation.isPending ? "جاري التحديث..." : "تحديث الدور"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
