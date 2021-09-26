// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
    AppNewUsers,
    AppBugReports,
    AppItemOrders,
    AppWeeklySales,
	AppBookHistory,
	AppTodayBook
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Digital of Pages</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWeeklySales />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppNewUsers />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppItemOrders />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBugReports />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <AppBookHistory />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <AppTodayBook />
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
}