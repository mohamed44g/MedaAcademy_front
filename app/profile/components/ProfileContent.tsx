"use client"
import { Box, IconButton, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { UserInfo } from "./sections/UserInfo"
import { ChangePassword } from "./sections/ChangePassword"
import { MyCourses } from "./sections/MyCourses"
import { MyWorkshops } from "./sections/MyWorkshops"
import { MyWallet } from "./sections/MyWallet"
import { DeleteAccount } from "./sections/DeleteAccount"

interface ProfileContentProps {
  user: any
  courses: any[]
  workshops: any[]
  comments: any[]
  wallet: any
  activeSection: string
  onMenuClick: () => void
  isMobile: boolean
}

export function ProfileContent({
  user,
  courses,
  workshops,
  comments,
  wallet,
  activeSection,
  onMenuClick,
  isMobile,
}: ProfileContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "info":
        return <UserInfo user={user} />
      case "password":
        return <ChangePassword />
      case "courses":
        return <MyCourses courses={courses} />
      case "workshops":
        return <MyWorkshops workshops={workshops} />
      case "wallet":
        return <MyWallet wallet={wallet} />
      case "delete":
        return <DeleteAccount user={user} />
      default:
        return <UserInfo user={user} />
    }
  }

  return (
    <Box>
      {/* Mobile Header */}
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            p: 2,
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            الملف الشخصي
          </Typography>
          <IconButton onClick={onMenuClick} sx={{ color: "primary.main" }}>
            <Menu />
          </IconButton>
        </Box>
      )}

      {/* Content */}
      {renderContent()}
    </Box>
  )
}
