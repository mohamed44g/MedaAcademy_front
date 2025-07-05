"use client"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  Pagination,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  LinearProgress,
} from "@mui/material"
import { Search, Add, AttachMoney, Delete, Visibility, CalendarToday, Schedule } from "@mui/icons-material"
import { useState } from "react"
import { useWorkshops, useCreateWorkshop, useDeleteWorkshop, useWorkshopParticipants } from "../../../hooks/useAdmin"

const ITEMS_PER_PAGE = 6

export default function WorkshopsPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false)
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<number | null>(null)
  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    price: "",
    max_participants: "",
    location: "",
    category: "",
  })

  const { data: workshops = [] } = useWorkshops()
  const { data: participants = [] } = useWorkshopParticipants(selectedWorkshopId || 0)
  const createWorkshopMutation = useCreateWorkshop()
  const deleteWorkshopMutation = useDeleteWorkshop()

  // Filter workshops based on search term
  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate workshops
  const totalPages = Math.ceil(filteredWorkshops.length / ITEMS_PER_PAGE)
  const paginatedWorkshops = filteredWorkshops.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleCreateWorkshop = () => {
    const formData = new FormData()
    Object.entries(newWorkshop).forEach(([key, value]) => {
      formData.append(key, value)
    })

    createWorkshopMutation.mutate(formData)
    setOpenDialog(false)
    setNewWorkshop({
      title: "",
      description: "",
      date: "",
      duration: "",
      price: "",
      max_participants: "",
      location: "",
      category: "",
    })
  }

  const handleDeleteWorkshop = (workshopId: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الورشة؟")) {
      deleteWorkshopMutation.mutate(workshopId)
    }
  }

  const handleViewParticipants = (workshopId: number) => {
    setSelectedWorkshopId(workshopId)
    setOpenParticipantsDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "#1784ad"
      case "full":
        return "#f57c00"
      case "completed":
        return "#4caf50"
      default:
        return "#757575"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "قادمة"
      case "full":
        return "مكتملة"
      case "completed":
        return "منتهية"
      default:
        return "غير محدد"
    }
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", direction: "rtl" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              إدارة الورشات
            </Typography>
            <Typography variant="body1" color="text.secondary">
              إدارة وتنظيم جميع الورشات التدريبية
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
            }}
          >
            إضافة ورشة جديدة
          </Button>
        </Box>

        {/* Search */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="البحث في الورشات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Box>

        {/* Workshops Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {paginatedWorkshops.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                }}
              >
                <CardMedia component="img" height="200" image={workshop.poster} alt={workshop.title} />
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                      {workshop.title}
                    </Typography>
                    <Chip
                      label={getStatusText(workshop.status)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(workshop.status) + "20",
                        color: getStatusColor(workshop.status),
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {workshop.description}
                  </Typography>

                  {/* Workshop Details */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(workshop.date).toLocaleDateString("ar-EG")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Schedule sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {workshop.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <AttachMoney sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {workshop.price === 0 ? "مجاني" : `${workshop.price} جنيه`}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Participants Progress */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        المشاركين
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {workshop.current_participants}/{workshop.max_participants}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(workshop.current_participants / workshop.max_participants) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#1784ad",
                        },
                      }}
                    />
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      المدرب: {workshop.instructor}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleViewParticipants(workshop.id)}
                        sx={{ color: "#1784ad" }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteWorkshop(workshop.id)}
                        sx={{ color: "error.main" }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Create Workshop Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>إضافة ورشة جديدة</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="عنوان الورشة"
                    value={newWorkshop.title}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="التصنيف"
                    value={newWorkshop.category}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, category: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="وصف الورشة"
                    multiline
                    rows={3}
                    value={newWorkshop.description}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="التاريخ"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={newWorkshop.date}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="المدة"
                    value={newWorkshop.duration}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, duration: e.target.value })}
                    placeholder="مثال: 6 ساعات"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="السعر (جنيه)"
                    type="number"
                    value={newWorkshop.price}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, price: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="الحد الأقصى للمشاركين"
                    type="number"
                    value={newWorkshop.max_participants}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, max_participants: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="المكان"
                    value={newWorkshop.location}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
            <Button
              onClick={handleCreateWorkshop}
              variant="contained"
              disabled={!newWorkshop.title || !newWorkshop.description || !newWorkshop.date}
            >
              إضافة الورشة
            </Button>
          </DialogActions>
        </Dialog>

        {/* Participants Dialog */}
        <Dialog open={openParticipantsDialog} onClose={() => setOpenParticipantsDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>المشاركين في الورشة</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              {participants.map((participant) => (
                <Box
                  key={participant.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {participant.email}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" color="text.secondary">
                      {participant.specialty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {participant.phone}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenParticipantsDialog(false)}>إغلاق</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
