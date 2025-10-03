import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Card, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";

const AdminBorrowRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    axios.get("http://localhost:8080/api/borrow-request", { withCredentials: true })
      .then((res) => {
        console.log("Borrow requests API response:", res.data);
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch requests");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user && user.isAdmin) fetchRequests();
  }, [user]);

  const handleAction = (id, action) => {
    const borrowedDate = new Date().toISOString().slice(0, 10);
    const dueDate = new Date(Date.now() + 14*24*60*60*1000).toISOString().slice(0, 10);
    axios.patch(`http://localhost:8080/api/borrow-request/${id}`, { action, borrowedDate, dueDate }, { withCredentials: true })
      .then(() => {
        toast.success(`Request ${action}ed`);
        fetchRequests();
      })
      .catch(() => toast.error("Failed to update request"));
  };

  if (!user || !user.isAdmin) return null;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Borrow Requests</Typography>
      {loading ? <CircularProgress/> : (
        <Grid container spacing={2}>
          {requests.length === 0 && <Typography>No requests found.</Typography>}
          {requests.map((req) => (
            <Grid item xs={12} md={6} key={req._id}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Stack spacing={1}>
                  <Typography><b>Book:</b> {req.book?.name || req.book}</Typography>
                  <Typography><b>User:</b> {req.user?.name || req.user}</Typography>
                  <Typography><b>Status:</b> {req.status}</Typography>
                  <Stack direction="row" spacing={2}>
                    {req.status === 'pending' && <>
                      <Button variant="contained" color="success" onClick={() => handleAction(req._id, 'accept')}>Accept</Button>
                      <Button variant="contained" color="error" onClick={() => handleAction(req._id, 'reject')}>Reject</Button>
                    </>}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminBorrowRequests;
