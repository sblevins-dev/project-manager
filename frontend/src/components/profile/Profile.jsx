import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { updateProfile } from "./ProfileService";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { toast } from "react-toastify"

const StyledSpan = styled("span")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  "& .label": {
    width: "200px",
  },
});

const Profile = () => {
  const { mode, setUser, user } = useContext(AppContext);
  const initialState = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    img: user.img,
  };
  const [formInput, setFormInput] = useState(initialState);

  const handlePictureUpload = (e) => {
    // setPic(e.target.files[0])
    let temp = URL.createObjectURL(e.target.files[0]);
    setFormInput({
      ...formInput,
      img: temp,
    });
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    let response = await updateProfile(formInput);
    if (!response) {
      toast.error("Error Updating Profile", {position: toast.POSITION.BOTTOM_RIGHT})
    } else {
      setUser(response)
      toast.success("Updated Profile", {position: toast.POSITION.BOTTOM_RIGHT})
    }
  };

  return (
    <Box
      p={2}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      borderRadius={1}
      gap={3}
      height="100%"
    >
      <Typography
        variant="h4"
        mb={2}
        sx={{ width: "max-content" }}
      >
        Profile
      </Typography>
      <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} />
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "50%",
          }}
        >
          <span>
            <label>Profile Image</label>
            <Avatar
              alt="name"
              src={formInput.img}
              sx={{
                width: "100px",
                height: "100px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            ></Avatar>
            <input
              type="file"
              name="img"
              style={{ marginBottom: "20px" }}
              onChange={handlePictureUpload}
            />
          </span>
          <StyledSpan>
            <label className="label">First Name</label>
            <TextField
              variant="filled"
              value={formInput.firstName}
              name="firstName"
              fullWidth
              onChange={handleChange}
            ></TextField>
          </StyledSpan>
          <StyledSpan>
            <label className="label">Last Name</label>
            <TextField
              variant="filled"
              value={formInput.lastName}
              name="lastName"
              fullWidth
              onChange={handleChange}
            ></TextField>
          </StyledSpan>
          <StyledSpan>
            <label className="label">Username</label>
            <TextField
              variant="filled"
              value={formInput.username}
              name="username"
              fullWidth
              onChange={handleChange}
            ></TextField>
          </StyledSpan>
          <StyledSpan>
            <label className="label">Email Address</label>
            <TextField
              variant="filled"
              value={formInput.email}
              name="email"
              fullWidth
              onChange={handleChange}
            ></TextField>
          </StyledSpan>
          <StyledSpan>
            <label className="label">Phone</label>
            <TextField
              variant="filled"
              value={formInput.phone}
              name="phone"
              fullWidth
              onChange={handleChange}
            ></TextField>
          </StyledSpan>
          <Button
            sx={{
              width: "200px",
              alignSelf: "center",
              bgcolor: "accent.primary",
              color: "white",
              "&:hover": { bgcolor: "accent.hover" },
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default Profile;
