import { Box, Container, Skeleton, Grid, Card, CardContent } from "@mui/material"

export default function UsersLoading() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", direction: "rtl" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Skeleton */}
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={300} height={50} />
          <Skeleton variant="text" width={500} height={30} />
        </Box>

        {/* Stats Cards Skeleton */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Skeleton variant="rectangular" height={80} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters Skeleton */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} md={3} key={item}>
                  <Skeleton variant="rectangular" height={56} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Skeleton variant="text" width={200} height={30} sx={{ mb: 2 }} />
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} variant="rectangular" height={60} sx={{ mb: 1 }} />
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
