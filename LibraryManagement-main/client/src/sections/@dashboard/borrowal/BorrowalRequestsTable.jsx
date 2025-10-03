import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";

const BorrowalRequestsTable = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.isAdmin) {
      axios.get("http://localhost:8080/api/borrow-request", { withCredentials: true })
        .then((res) => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (!user || !user.isAdmin) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Pending Borrow Requests</Typography>
      {loading ? <CircularProgress/> : (
        <Grid container spacing={2}>
          {requests.filter(r => r.status === 'pending').length === 0 && <Typography>No pending requests.</Typography>}
          {requests.filter(r => r.status === 'pending').map((req) => (
            <Grid item xs={12} md={6} key={req._id}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Stack spacing={1}>
                  <Typography><b>Book:</b> {req.book?.name || req.book}</Typography>
                  <Typography><b>User:</b> {req.user?.name || req.user}</Typography>
                  <Typography><b>Status:</b> {req.status}</Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BorrowalRequestsTable;
