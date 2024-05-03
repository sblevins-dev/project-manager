import { Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

const TaskModal = ({
  taskFormInput,
  setTaskFormInput,
  close,
  taskModalOpen,
  subjectError,
  descError,
  addTask,
}) => {

    const addTaskButton = (
        <Button
          variant="contained"
          onClick={addTask}
          sx={{
            backgroundColor: "accent.primary",
            color: "white",
            maxWidth: "50%",
            alignSelf: "center",
            "&:hover": { backgroundColor: "accent.hover" },
          }}
        >
          Add Task
        </Button>
      );
  return (
    <Modal
      open={taskModalOpen}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
      borderRadius={1}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "max-content",
          width: {xs: "95%", sm: "500px"},
          bgcolor: "background.default",
        }}
      >
        <Box
          p={2}
          borderRadius={1}
          boxShadow={0}
          sx={{ position: "relative", width: "100%", height: "100%" }}
        >
          <IconButton
            color="error"
            sx={{ position: "absolute", right: "20px" }}
            onClick={close}
          >
            <CancelIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight={400}
            mb={2}
            sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
          >
            Add Task
          </Typography>
          <Typography sx={{marginBottom: '16px'}}>
            Only you can see your personal logs...
          </Typography>
          <Box
            flexDirection="column"
            justifyContent="space-between"
            sx={{ display: "flex", gap: "30px" }}
          >
            <TextField
              required
              error={subjectError}
              multiline
              id="outlined-required"
              name="subject"
              label="Subject"
              variant="filled"
              onChange={(e) =>
                setTaskFormInput({
                  ...taskFormInput,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <TextField
              required
              error={descError}
              multiline
              id="outlined-required"
              name="description"
              label="Description"
              value={taskFormInput.description}
              variant="filled"
              onChange={(e) =>
                setTaskFormInput({
                  ...taskFormInput,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {addTaskButton}
          </Box>
        </Box>
      </Box>
      {/* {addTaskButton} */}
    </Modal>
  );
};

export default TaskModal;
