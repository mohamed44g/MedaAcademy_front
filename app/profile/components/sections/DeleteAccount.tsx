"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { DeleteForever, Warning } from "@mui/icons-material"

interface DeleteAccountProps {
  user: any
}

export function DeleteAccount({ user }: DeleteAccountProps) {
  const [confirmText, setConfirmText] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("Account deleted")
    setLoading(false)
    setDialogOpen(false)
  }

  const isConfirmValid = confirmText === "حذف حسابي"

  const consequences = [
    "سيتم حذف جميع بياناتك الشخصية نهائياً",
    "ستفقد الوصول إلى جميع الكورسات المسجل بها",
    "سيتم حذف جميع تعليقاتك ومشاركاتك",
    "لن تتمكن من استرداد رصيد المحفظة",
    "سيتم إلغاء جميع الورش المسجل بها",
    "لن تتمكن من استعادة الحساب مرة أخرى",
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
            boxShadow: "0 4px 15px rgba(244, 67, 54, 0.3)",
          }}
        >
          <DeleteForever sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#f44336" }}>
            حذف الحساب
          </Typography>
          <Typography variant="body1" color="text.secondary">
            حذف حسابك نهائياً من المنصة
          </Typography>
        </Box>
      </Box>

      {/* Warning Alert */}
      <Alert
        severity="error"
        icon={<Warning />}
        sx={{
          mb: 4,
          borderRadius: 3,
          "& .MuiAlert-message": {
            fontSize: "1rem",
            fontWeight: 600,
          },
        }}
      >
        تحذير: هذا الإجراء لا يمكن التراجع عنه. سيتم حذف حسابك وجميع بياناتك نهائياً.
      </Alert>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#f44336" }}>
            ما الذي سيحدث عند حذف حسابك؟
          </Typography>

          <List sx={{ mb: 4 }}>
            {consequences.map((consequence, index) => (
              <ListItem key={index} sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  <Warning sx={{ color: "#f44336", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={consequence}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      color: "text.primary",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<DeleteForever />}
              onClick={() => setDialogOpen(true)}
              sx={{
                borderRadius: 3,
                px: 6,
                py: 2,
                background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
                boxShadow: "0 4px 15px rgba(244, 67, 54, 0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(244, 67, 54, 0.4)",
                },
              }}
            >
              حذف الحساب نهائياً
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
            color: "white",
            textAlign: "center",
            p: 3,
          }}
        >
          <DeleteForever sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            تأكيد حذف الحساب
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            هذا الإجراء لا يمكن التراجع عنه!
          </Alert>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            لتأكيد حذف حسابك، يرجى كتابة النص التالي في المربع أدناه:
          </Typography>

          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              p: 2,
              mb: 3,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#f44336",
                fontFamily: "monospace",
              }}
            >
              حذف حسابي
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="اكتب النص للتأكيد"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            error={confirmText.length > 0 && !isConfirmValid}
            helperText={confirmText.length > 0 && !isConfirmValid ? "النص غير صحيح" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
            }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={!isConfirmValid || loading}
            startIcon={loading ? null : <DeleteForever />}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
            }}
          >
            {loading ? "جاري الحذف..." : "حذف الحساب نهائياً"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
