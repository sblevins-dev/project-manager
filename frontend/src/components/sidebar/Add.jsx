import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Cancel } from "@mui/icons-material";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createBug } from "./AddBug";
import { useEffect } from "react";
import { toast } from "react-toastify";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const { open, setOpen } = useContext(AppContext);
  const [value, setValue] = useState(null);
  const { projList, mode, user, pullBugs } = useContext(AppContext);

  const initialState = {
    creator: user.id,
    issue: "",
    priority: 1,
    dueBy: value,
    description: "",
    projId: "",
    teamId: user.teamId,
  };
  const [formInput, setFormInput] = useState(initialState);

  const [issueError, setIssueError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [dueByError, setDueByError] = useState(false);
  const [projError, setProjError] = useState(false);

  useEffect(() => {
    setIssueError(false);
    setDescError(false);
    setDueByError(false);
    setProjError(false);
  }, [open]);

  const inputValidation = () => {
    if (formInput.issue === "") {
      setIssueError(true);
    } else {
      setIssueError(false);
    }
    if (formInput.description === "") {
      setDescError(true);
    } else {
      setDescError(false);
    }
    if (formInput.dueBy === null) {
      setDueByError(true);
    } else {
      setDueByError(false);
    }
    if (formInput.projId === "") {
      setProjError(true);
    } else {
      setProjError(false);
    }
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const myAsyncFunc = async () => {
    setOpen(false);
    setFormInput(initialState);
    let resp = await createBug(formInput);

    if (resp) {
      await pullBugs();
      toast.success("Created Bug", { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      toast.error("Error Creating Bug", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleSubmit = () => {
    const { creator, issue, priority, dueBy, description, projId, teamId } =
      formInput;

    if (
      creator === "" ||
      issue === "" ||
      priority === "" ||
      dueBy === null ||
      description === "" ||
      projId === "" ||
      teamId === ""
    ) {
      inputValidation();
    } else {
      myAsyncFunc();
    }
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Bug"
        sx={{
          position: "fixed",
          bottom: 20,
          left: 60,
          backgroundColor: "accent.primary",
          color: "white",
          "&:hover": { backgroundColor: "accent.hover" },
        }}
      >
        <Fab aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-desc"
      >
        <Box
          height="max-content"
          color={"text.primary"}
          p={3}
          gap={3}
          borderRadius={1}
          display="flex"
          flexDirection="column"
          position="relative"
          sx={{
            width: { xs: "95%", sm: "500px" },
            bgcolor: mode === "dark" ? "#1c1c1c" : "white",
          }}
        >
          <IconButton
            color="error"
            sx={{ position: "absolute", right: "20px" }}
            onClick={() => setOpen(false)}
          >
            <Cancel />
          </IconButton>
          <Typography variant="h6" textAlign="center">
            Create Bug
          </Typography>
          <UserBox>
            <Avatar
              alt={user.firstName + " " + user.lastName}
              src={user.img}
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              {user.firstName + " " + user.lastName}
            </Typography>
          </UserBox>
          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            label="Issue"
            variant="filled"
            name="issue"
            error={issueError}
            onChange={handleChange}
          />
          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            label="Description"
            variant="filled"
            name="description"
            error={descError}
            onChange={handleChange}
          />
          <FormControl
            fullWidth
            required
            sx={{
              bgcolor: mode === "dark" ? "background.dark" : "background.light",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              variant="standard"
              size="small"
              sx={{ padding: "10px" }}
            >
              Priority
            </InputLabel>
            <Select
              required
              label="priority"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formInput.priority}
              name="priority"
              onChange={handleChange}
              variant="filled"
              sx={{
                bgcolor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.06)",
              }}
            >
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Minor</MenuItem>
              <MenuItem value={3}>Major</MenuItem>
              <MenuItem value={4}>Critical</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            error={projError}
            required
            sx={{
              bgcolor:
                mode === "dark" ? "background.dark" : "background.default",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              variant="standard"
              size="small"
              sx={{ padding: "10px" }}
            >
              Project
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="filled"
              value={formInput.projId}
              name="projId"
              onChange={handleChange}
              sx={{
                bgcolor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.06)",
              }}
            >
              {projList.map((proj) => (
                <MenuItem key={proj.id} value={proj.id}>
                  {proj.projTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due By"
              value={formInput.dueBy}
              name="dueBy"
              variant="filled"
              onChange={(newValue) => {
                setFormInput({
                  ...formInput,
                  dueBy: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  sx={{
                    background:
                      mode === "dark"
                        ? "rgba(255, 255, 255, 0.07)"
                        : "rgba(0,0,0,0.06)",
                  }}
                  error={dueByError}
                />
              )}
            />
          </LocalizationProvider>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={handleSubmit}
              sx={{ "&:hover": { backgroundColor: "accent.hover", color: "white" }, color: mode === "dark" ? "accent.primary" : "white", backgroundColor: mode === "dark" ? "white" : "accent.primary" }}
            >
              Post
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;
