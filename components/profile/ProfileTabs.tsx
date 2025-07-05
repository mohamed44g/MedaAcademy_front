"use client";
import type React from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  Edit,
  Lock,
  School,
  WorkSharp,
  Comment,
} from "@mui/icons-material";
import { useState } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { UserInfo } from "./UserInfo";
import { UpdateInfo } from "./UpdateInfo";
import { ChangePassword } from "./ChangePassword";
import { MyCourses } from "./MyCourses";
import { MyWorkshops } from "./MyWorkshops";
import { MyComments } from "./MyComments";

interface ProfileTabsProps {
  user: any;
  courses: any[];
  workshops: any[];
  comments: any[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export function ProfileTabs({
  user,
  courses,
  workshops,
  comments,
}: ProfileTabsProps) {
  const [value, setValue] = useState(0);
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "معلومات الحساب",
      icon: <Person />,
      component: <UserInfo user={user} />,
    },
    {
      label: "تحديث البيانات",
      icon: <Edit />,
      component: <UpdateInfo user={user} />,
    },
    {
      label: "تغيير كلمة المرور",
      icon: <Lock />,
      component: <ChangePassword />,
    },
    {
      label: "كورساتي",
      icon: <School />,
      component: <MyCourses courses={courses} />,
    },
    {
      label: "ورشي",
      icon: <WorkSharp />,
      component: <MyWorkshops workshops={workshops} />,
    },
    {
      label: "تعليقاتي",
      icon: <Comment />,
      component: <MyComments comments={comments} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            py: 3,
            textAlign: "center",
          }}
        >
          الملف الشخصي
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 600,
              minHeight: 64,
              "&.Mui-selected": {
                color: "white",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ gap: 1 }}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
