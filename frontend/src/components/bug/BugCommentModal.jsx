import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { AddBugComment } from "./AddBugComment";
import { toast } from 'react-toastify'

export const BugCommentModal = ({
  isCommentModalOpen,
  commentModalClose,
  bug,
}) => {
  const { user, pullBugs, mode } = useContext(AppContext);

  const initialState = {
    name: user.firstName + " " + user.lastName,
    img: user.img,
    subject: "",
    description: "",
  };

  const [comment, setComment] = useState(initialState);

  const [subjectError, setSubjectError] = useState(false);
  const [descError, setDescError] = useState(false);

  const inputValidation = () => {
    if (comment.subject === "") {
      setSubjectError(true);
    } else {
      setSubjectError(false);
    }
    if (comment.description === "") {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (comment.subject === "" || comment.description === "") {
      inputValidation();
    } else {
      const response = await AddBugComment(comment, bug._id);

      if (response) {
        await commentModalClose();
        await bug.comments.push(comment);
        toast.success("Comment Added", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Error adding comment", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  return (
    <Modal
      open={isCommentModalOpen}
      onClose={commentModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        p={2}
        borderRadius={1}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "max-content",
          width: { xs: "95%", sm: "500px" },
          bgcolor: mode === "dark" ? "#1c1c1c" : "white",
        }}
      >
        <Typography
          mb={2}
          position="relative"
          variant="h5"
          fontWeight={400}
          sx={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)", width: "max-content" }}
        >
          Add Comment
        </Typography>

        <IconButton
          color="error"
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={commentModalClose}
        >
          <CancelIcon />
        </IconButton>

        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          justifyContent="space-evenly"
        >
          <TextField
            required
            multiline
            id="comment-subject"
            variant="filled"
            label="Subject"
            name="subject"
            error={subjectError}
            value={comment.subject}
            fullWidth
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            multiline
            id="comment-description"
            variant="filled"
            label="Write something..."
            name="description"
            error={descError}
            value={comment.description}
            fullWidth
            onChange={handleChange}
          ></TextField>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "accent.primary",
              color: "white",
              maxWidth: "50%",
              alignSelf: "center",
              "&:hover": { backgroundColor: "accent.hover" },
            }}
            onClick={handleClick}
          >
            Add Comment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
