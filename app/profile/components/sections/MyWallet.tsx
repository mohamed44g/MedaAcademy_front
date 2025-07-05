"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid2,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Pagination,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Add,
  TrendingUp,
  TrendingDown,
  Receipt,
  AttachMoney,
} from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";

interface MyWalletProps {
  wallet: { balance: number; currency: string };
  transactions: any[];
  total: number;
  currentPage: number;
}

export function MyWallet({
  wallet,
  transactions,
  total,
  currentPage,
}: MyWalletProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getTransactionIcon = (type: string) => {
    return type === "deposit" ? (
      <TrendingUp sx={{ color: "#4caf50" }} />
    ) : (
      <TrendingDown sx={{ color: "#f44336" }} />
    );
  };

  const getTransactionColor = (type: string) => {
    return type === "deposit" ? "#4caf50" : "#f44336";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // حساب عدد الصفحات
  const totalPages = Math.ceil(total / 4);

  // التعامل مع تغيير الصفحة
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            background: "#1784ad",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
            boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
          }}
        >
          <AccountBalanceWallet sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "primary.main" }}
          >
            المحفظة
          </Typography>
          <Typography variant="body1" color="text.secondary">
            إدارة رصيدك والمعاملات المالية
          </Typography>
        </Box>
      </Box>

      <Grid2 container spacing={4}>
        {/* Balance Card */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                transform: "translate(40px, -40px)",
              },
            }}
          >
            <CardContent sx={{ p: 4, position: "relative", zIndex: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <AttachMoney sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                  {wallet.balance}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {wallet.currency}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Add Money Button */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<Add />}
            sx={{
              mt: 2,
              borderRadius: 3,
              py: 1.5,
              background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
              },
            }}
          >
            إضافة رصيد
          </Button>
        </Grid2>

        {/* Transactions */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Receipt sx={{ color: "primary.main", fontSize: 24, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  المعاملات الأخيرة
                </Typography>
              </Box>

              {transactions?.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Receipt
                    sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    لا توجد معاملات بعد
                  </Typography>
                </Box>
              ) : (
                <>
                  <List sx={{ p: 0 }}>
                    {transactions.map((transaction: any, index: number) => (
                      <Box key={transaction.id}>
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 50 }}>
                            {getTransactionIcon(transaction.type)}
                            <Box sx={{ textAlign: "right" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  color: getTransactionColor(transaction.type),
                                }}
                              >
                                {transaction.type === "deposit" ? "+" : "-"}
                                {transaction.amount.toLocaleString()}{" "}
                                {wallet.currency}
                              </Typography>
                            </Box>
                          </ListItemIcon>

                          <ListItemText
                            primary={transaction.description}
                            secondary={formatDate(transaction.createdAt)}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: 600,
                                color: "text.primary",
                              },
                              "& .MuiListItemText-secondary": {
                                color: "text.secondary",
                                fontSize: "0.875rem",
                              },
                            }}
                          />
                        </ListItem>
                        {index < transactions.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>

                  {/* Pagination Controls */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(_event, page) => handlePageChange(page)}
                      color="primary"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          fontWeight: 600,
                          "&.Mui-selected": {
                            background:
                              "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                            color: "white",
                          },
                        },
                      }}
                    />
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}
