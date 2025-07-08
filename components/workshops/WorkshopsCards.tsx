"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid2,
  Stack,
  Pagination,
} from "@mui/material";
import {
  CalendarToday,
  Schedule,
  AttachMoney,
  ArrowForward,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import WorkShopCard from "./workShopCard";
import toast from "react-hot-toast";

interface Workshop {
  id: number;
  title: string;
  description: string;
  price: number;
  formattedDate: string;
  duration: string;
  image: string;
}

interface WorkshopsSectionProps {
  workshops: Workshop[];
  baseUrl: string;
  totalPages: number;
  currentPage: number;
}

export function Workshops({
  workshops,
  baseUrl,
  totalPages,
  currentPage,
}: WorkshopsSectionProps) {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate } = useMutation({
    mutationFn: async (workshopId: number) => {
      const response = await axiosInstance.post(
        `/workshops/${workshopId}/enroll`
      );
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("تم التسجيل بنجاح");
    },
    onError: (error: any) => {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("حدث خطأ أثناء التسجيل");
    },
  });

  const enrollWorkshop = (workshopId: number) => {
    mutate(workshopId);
  };

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`/workshops?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Box
      sx={{
        py: { xs: 8, md: 15 },
        px: 2,
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: isDarkMode
            ? "linear-gradient(135deg, #1784ad10 0%, #4fa8c505 100%)"
            : "linear-gradient(135deg, #1784ad10 0%, #4fa8c505 100%)",
          borderRadius: "50% 0 0 50%",
          transform: "translateX(25%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          justifyContent: "space-between",
        }}
      >
        <Grid2 container spacing={5}>
          {workshops.map((workshop: any) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={workshop.id}>
              <WorkShopCard
                workshop={workshop}
                onEnroll={() => enrollWorkshop(workshop.id)}
              />
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#1784ad50" : "#1784ad20",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
