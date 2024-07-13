import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";  
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close"; 
import { makeStyles } from '@mui/styles';
// Custom styles
const useStyles = makeStyles({
  container: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    paddingLeft:"50px",
    paddingRight:"50px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto"
  },
  header: {
    color: "#1a73e8",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    '&:hover': {
      backgroundColor: "#1558b0",
    },
    marginTop: "20px",
    width: "100%",
  },     
  closeButton: {
    display: "block",
    margin: "20px auto 0 auto",
    fontWeight: "bold",
  },
  alert: {
    marginBottom: "20px",
  }
});

const ChangePassword = ({ onClose }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(true);
   
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New Password and Confirm Password do not match');
      setOpen(true);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/user/${currentUser._id}/change-password`,
        { oldPassword, newPassword, confirmPassword },
        config
      );

      setMessage(data.message);
      setOpen(true);
    } catch (error) {
      setMessage(error.response.data.message || 'Error changing password');
      setOpen(true);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Change Your Password</h2>
      {message && (
        <Box sx={{ width: "100%" }} className={classes.alert}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <p>{message}</p>
            </Alert>
          </Collapse>
        </Box>
      )}
      <form onSubmit={handleChangePassword}>
        <TextField
          className={classes.input}
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className={classes.input}
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          className={classes.input}
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
        >
          Change Password
        </Button>
      </form>
      <button className=' mt-2 justify-end text-end font-bold' type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ChangePassword;