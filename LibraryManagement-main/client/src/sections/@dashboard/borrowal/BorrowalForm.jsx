import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Iconify from "../../../components/iconify";
import { useAuth } from "../../../hooks/useAuth";

const BorrowalForm = ({
                        handleAddBorrowal,
                        handleUpdateBorrowal,
                        isUpdateForm,
                        isModalOpen,
                        handleCloseModal,
                        borrowal,
                        setBorrowal,
                      }) => {
  const {user} = useAuth();
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const getAllMembers = () => {
    axios.get('https://lms-backend-2s98.onrender.com/api/user/getAllMembers')
      .then((response) => {
        // handle success
        console.log(response.data)
        if (user.isAdmin) {
          setMembers(response.data.membersList)
        } else {
          setMembers(response.data.membersList.filter((member) => user._id === member._id))
        }
        setBorrowal({...borrowal, memberId: user._id})
      })
      .catch((error) => {
        // handle error
        toast.error("Error fetching members")
        console.log(error);
      })
  }

  const getAllBooks = () => {
    axios.get('https://lms-backend-2s98.onrender.com/api/book/getAll')
      .then((response) => {
        // handle success
        console.log(response.data)
        setBooks(response.data.booksList)
      })
      .catch((error) => {
        // handle error
        toast.error("Error fetching books")
        console.log(error);
      })
  }

  // Load data on initial page load
  useEffect(() => {
    getAllMembers();
    getAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: 16,
    p: 4,
  };


  // Only admins can add or update borrowals directly
  if (!user.isAdmin) return null;
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} borrowal
          </Typography>
          <Stack spacing={3} paddingY={2}>
            <FormControl fullWidth>
              <InputLabel id="member-label">Member</InputLabel>
              <Select
                labelId="member-label"
                id="member-select"
                value={borrowal.memberId || ''}
                label="Member"
                onChange={e => setBorrowal({ ...borrowal, memberId: e.target.value })}
                disabled={!user.isAdmin}
              >
                {members.map((member) => (
                  <MenuItem key={member._id} value={member._id}>{member.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="book-label">Book</InputLabel>
              <Select
                labelId="book-label"
                id="book-select"
                value={borrowal.bookId || ''}
                label="Book"
                onChange={e => setBorrowal({ ...borrowal, bookId: e.target.value })}
              >
                {books.map((book) => (
                  <MenuItem key={book._id} value={book._id}>{book.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Borrowed Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={borrowal.borrowedDate ? borrowal.borrowedDate.slice(0,10) : ''}
              onChange={e => setBorrowal({ ...borrowal, borrowedDate: e.target.value })}
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={borrowal.dueDate ? borrowal.dueDate.slice(0,10) : ''}
              onChange={e => setBorrowal({ ...borrowal, dueDate: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={borrowal.status || ''}
                label="Status"
                onChange={e => setBorrowal({ ...borrowal, status: e.target.value })}
              >
                <MenuItem value="borrowed">Borrowed</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" color="primary" onClick={() => {
                if (isUpdateForm) {
                  handleUpdateBorrowal();
                } else {
                  handleAddBorrowal();
                }
              }}>
                {isUpdateForm ? 'Update' : 'Add'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
}

BorrowalForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  borrowal: PropTypes.object,
  setBorrowal: PropTypes.func,
  handleAddBorrowal: PropTypes.func,
  handleUpdateBorrowal: PropTypes.func
};

export default BorrowalForm
