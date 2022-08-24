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
import { AddComment } from "./AddComment";
import { toast } from "react-toastify";

const ProjCommentModal = ({ isCommentModalOpen, commentModalClose, state }) => {
  const { user, pullBugs } = useContext(AppContext);

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
      const response = await AddComment(comment, state._id);

      if (response) {
        await commentModalClose();
        await state.comments.push(comment);
        toast.success("Added Comment", {
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
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "max-content",
          width: { xs: "95%", sm: "400px" },
          bgcolor: "background.default",
          borderRadius: "5px",
          boxShadow: 24,
        }}
      >
        <Typography
          mb={2}
          position="relative"
          variant="h5"
          fontWeight={400}
          sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
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
          gap={2}
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

export default ProjCommentModal;
