import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h4" component="h1">
            User Dashboard
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Welcome!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You are logged in as a {role}.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" component="span">
                    Role: {role}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                {role === "admin" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() => navigate("/admin")}
                  >
                    Go to Admin Panel
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}