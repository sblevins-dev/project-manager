import { Alert, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { useState } from "react";

const LogModal = ({
  addLogButton,
  logFormInput,
  setLogFormInput,
  close,
  logModalOpen,
  mode,
  subjectError,
  descError,
}) => {
  return (
    <Modal
      open={logModalOpen}
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
          bgcolor={"background.dark"}
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
            Add Log
          </Typography>
          <Typography sx={{marginBottom: '16px'}}>
            Only you can see your personal logs...
          </Typography>
          <Box
            flexDirection="column"
            justifyContent="space-between"
            display="flex"
            gap={4}
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
                setLogFormInput({
                  ...logFormInput,
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
              value={logFormInput.description}
              variant="filled"
              onChange={(e) =>
                setLogFormInput({
                  ...logFormInput,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {addLogButton}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogModal;
