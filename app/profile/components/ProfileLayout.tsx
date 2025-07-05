"use client"
import { Grid2, useMediaQuery, useTheme } from "@mui/material"
import { ProfileSidebar } from "./ProfileSidebar"
import { ProfileContent } from "./ProfileContent"
import { useState } from "react"

interface ProfileLayoutProps {
  user: any
  courses: any[]
  workshops: any[]
  comments: any[]
  wallet: any
  activeSection: string
}

export function ProfileLayout({ user, courses, workshops, comments, wallet, activeSection }: ProfileLayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Grid2 container spacing={4}>
      {/* Sidebar */}
      <Grid2 size={{ xs: 12, md: 3 }}>
        <ProfileSidebar
          user={user}
          activeSection={activeSection}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          onSidebarClose={() => setSidebarOpen(false)}
        />
      </Grid2>

      {/* Main Content */}
      <Grid2 size={{ xs: 12, md: 9 }}>
        <ProfileContent
          user={user}
          courses={courses}
          workshops={workshops}
          comments={comments}
          wallet={wallet}
          activeSection={activeSection}
          onMenuClick={() => setSidebarOpen(true)}
          isMobile={isMobile}
        />
      </Grid2>
    </Grid2>
  )
}
