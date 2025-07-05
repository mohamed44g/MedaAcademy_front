"use client"
import { useState } from "react"
import type React from "react"

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import { Add, Edit, Delete, VideoLibrary, School, Upload } from "@mui/icons-material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCourses, useCreateCourse, useSpecialties, useCreateChapter, useCreateVideo } from "../../hooks/useAdmin"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function CoursesTab() {
  const [tabValue, setTabValue] = useState(0)
  const [courseDialogOpen, setCourseDialogOpen] = useState(false)
  const [chapterDialogOpen, setChapterDialogOpen] = useState(false)
  const [videoDialogOpen, setVideoDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  const { data: courses } = useCourses()
  const { data: specialties } = useSpecialties()
  const createCourseMutation = useCreateCourse()
  const createChapterMutation = useCreateChapter()
  const createVideoMutation = useCreateVideo()

  // Course Form
  const courseFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      specialty_id: "",
      poster: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("عنوان الكورس مطلوب"),
      description: Yup.string().required("وصف الكورس مطلوب"),
      price: Yup.number().min(0, "السعر يجب أن يكون أكبر من أو يساوي صفر"),
      specialty_id: Yup.string().required("التخصص مطلوب"),
    }),
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("description", values.description)
      formData.append("price", values.price.toString())
      formData.append("specialty_id", values.specialty_id)
      if (values.poster) {
        formData.append("poster", values.poster)
      }

      createCourseMutation.mutate(formData, {
        onSuccess: () => {
          setCourseDialogOpen(false)
          courseFormik.resetForm()
        },
      })
    },
  })

  // Chapter Form
  const chapterFormik = useFormik({
    initialValues: {
      title: "",
      type: "midterm" as "midterm" | "final",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("عنوان الفصل مطلوب"),
      type: Yup.string().required("نوع الفصل مطلوب"),
    }),
    onSubmit: (values) => {
      if (selectedCourse) {
        createChapterMutation.mutate(
          {
            course_id: selectedCourse,
            title: values.title,
            type: values.type,
          },
          {
            onSuccess: () => {
              setChapterDialogOpen(false)
              chapterFormik.resetForm()
            },
          },
        )
      }
    },
  })

  // Video Form
  const videoFormik = useFormik({
    initialValues: {
      title: "",
      video: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("عنوان الفيديو مطلوب"),
    }),
    onSubmit: (values) => {
      if (selectedChapter && values.video) {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("chapter_id", selectedChapter.toString())
        formData.append("video", values.video)

        createVideoMutation.mutate(formData, {
          onSuccess: () => {
            setVideoDialogOpen(false)
            videoFormik.resetForm()
          },
        })
      }
    },
  })

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="الكورسات" icon={<School />} iconPosition="start" />
          <Tab label="الفصول" icon={<VideoLibrary />} iconPosition="start" />
          <Tab label="الفيديوهات" icon={<Upload />} iconPosition="start" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            إدارة الكورسات
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCourseDialogOpen(true)}
            sx={{ borderRadius: 3 }}
          >
            إضافة كورس جديد
          </Button>
        </Box>

        <Grid container spacing={3}>
          {courses?.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ height: "100%", borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.poster || "/placeholder.svg?height=200&width=300"}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Chip label={course.specialty_name} color="primary" size="small" />
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      {course.price === 0 ? "مجاني" : `${course.price} جنيه`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<VideoLibrary />}
                      onClick={() => {
                        setSelectedCourse(course.id)
                        setTabValue(1)
                      }}
                    >
                      الفصول
                    </Button>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            إدارة الفصول
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setChapterDialogOpen(true)}
            disabled={!selectedCourse}
            sx={{ borderRadius: 3 }}
          >
            إضافة فصل جديد
          </Button>
        </Box>

        {!selectedCourse && (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            يرجى اختيار كورس أولاً من تبويب الكورسات
          </Typography>
        )}

        {selectedCourse && (
          <List>
            {/* Mock chapters data - replace with actual data */}
            <ListItem>
              <ListItemText primary="مقدمة في طب القلب" secondary="Midterm - 5 فيديوهات" />
              <ListItemSecondaryAction>
                <Button
                  size="small"
                  onClick={() => {
                    setSelectedChapter(1)
                    setTabValue(2)
                  }}
                >
                  الفيديوهات
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            إدارة الفيديوهات
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setVideoDialogOpen(true)}
            disabled={!selectedChapter}
            sx={{ borderRadius: 3 }}
          >
            رفع فيديو جديد
          </Button>
        </Box>

        {!selectedChapter && (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            يرجى اختيار فصل أولاً من تبويب الفصول
          </Typography>
        )}
      </TabPanel>

      {/* Course Dialog */}
      <Dialog open={courseDialogOpen} onClose={() => setCourseDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>إضافة كورس جديد</DialogTitle>
        <form onSubmit={courseFormik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="عنوان الكورس"
                  value={courseFormik.values.title}
                  onChange={courseFormik.handleChange}
                  error={courseFormik.touched.title && Boolean(courseFormik.errors.title)}
                  helperText={courseFormik.touched.title && courseFormik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="وصف الكورس"
                  value={courseFormik.values.description}
                  onChange={courseFormik.handleChange}
                  error={courseFormik.touched.description && Boolean(courseFormik.errors.description)}
                  helperText={courseFormik.touched.description && courseFormik.errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="price"
                  label="السعر (0 للمجاني)"
                  value={courseFormik.values.price}
                  onChange={courseFormik.handleChange}
                  error={courseFormik.touched.price && Boolean(courseFormik.errors.price)}
                  helperText={courseFormik.touched.price && courseFormik.errors.price}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  name="specialty_id"
                  label="التخصص"
                  value={courseFormik.values.specialty_id}
                  onChange={courseFormik.handleChange}
                  error={courseFormik.touched.specialty_id && Boolean(courseFormik.errors.specialty_id)}
                  helperText={courseFormik.touched.specialty_id && courseFormik.errors.specialty_id}
                >
                  {specialties?.map((specialty) => (
                    <MenuItem key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  رفع صورة الكورس
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        courseFormik.setFieldValue("poster", file)
                      }
                    }}
                  />
                </Button>
                {courseFormik.values.poster && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {courseFormik.values.poster.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCourseDialogOpen(false)}>إلغاء</Button>
            <Button type="submit" variant="contained" disabled={createCourseMutation.isPending}>
              {createCourseMutation.isPending ? "جاري الإنشاء..." : "إنشاء الكورس"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Chapter Dialog */}
      <Dialog open={chapterDialogOpen} onClose={() => setChapterDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>إضافة فصل جديد</DialogTitle>
        <form onSubmit={chapterFormik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="عنوان الفصل"
                  value={chapterFormik.values.title}
                  onChange={chapterFormik.handleChange}
                  error={chapterFormik.touched.title && Boolean(chapterFormik.errors.title)}
                  helperText={chapterFormik.touched.title && chapterFormik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  name="type"
                  label="نوع الفصل"
                  value={chapterFormik.values.type}
                  onChange={chapterFormik.handleChange}
                >
                  <MenuItem value="midterm">Midterm</MenuItem>
                  <MenuItem value="final">Final</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setChapterDialogOpen(false)}>إلغاء</Button>
            <Button type="submit" variant="contained" disabled={createChapterMutation.isPending}>
              {createChapterMutation.isPending ? "جاري الإنشاء..." : "إنشاء الفصل"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>رفع فيديو جديد</DialogTitle>
        <form onSubmit={videoFormik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="عنوان الفيديو"
                  value={videoFormik.values.title}
                  onChange={videoFormik.handleChange}
                  error={videoFormik.touched.title && Boolean(videoFormik.errors.title)}
                  helperText={videoFormik.touched.title && videoFormik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  اختيار ملف الفيديو
                  <input
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        videoFormik.setFieldValue("video", file)
                      }
                    }}
                  />
                </Button>
                {videoFormik.values.video && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {videoFormik.values.video.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVideoDialogOpen(false)}>إلغاء</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createVideoMutation.isPending || !videoFormik.values.video}
            >
              {createVideoMutation.isPending ? "جاري الرفع..." : "رفع الفيديو"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
