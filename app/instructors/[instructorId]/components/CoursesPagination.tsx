"use client";
import { Box, Pagination } from "@mui/material";
import type React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";

interface CoursesPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function CoursesPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: CoursesPaginationProps) {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}#courses`);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
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
  );
}
