import {
  Box,
  IconButton,
  ListItem,
  Typography,
  ListItemText,
  Button,
  List,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import LogModal from "./LogModal";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { useEffect } from "react";
import { GetLogs, AddLog, DeleteLog } from "./LogFuncs";
import { toast } from "react-toastify";

const FRUITS = [
  "🍏 Apple",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥥 Coconut",
  "🍉 Watermelon",
];

function renderItem({ item, handleRemoveLog, formatDate }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveLog(item)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      }
    >
      <ListItemText
        primary={
          <Typography variant="h6" fontWeight={400}>
            {item.subject}
          </Typography>
        }
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body1"
            >
              {formatDate(item.createdAt)}
              {" - "}
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body3"
            >
              {item.description}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}

const MyLogs = ({ bug }) => {
  const { mode, user, formatDate } = useContext(AppContext);
  const [logs, setLogs] = useState("");
  const [logModalOpen, setLogModalOpen] = useState(false);

  const getLogs = async () => {
    const resp = await GetLogs(bug._id, user.id);

    setLogs(resp);
  };

  useEffect(() => {
    if (bug) {
      getLogs();
    }
  }, [bug]);

  const logInitialState = {
    id: Math.floor(Math.random() * 1000),
    userId: user.id,
    subject: "",
    description: "",
  };

  const [logFormInput, setLogFormInput] = useState(logInitialState);

  const [subjectError, setSubjectError] = useState(false);
  const [descError, setDescError] = useState(false);

  const inputValidation = () => {
    if (logFormInput.subject === "") {
      setSubjectError(true);
    } else {
      setSubjectError(false);
    }
    if (logFormInput.description === "") {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

  const addLog = async () => {
    const resp = await AddLog(bug._id, logFormInput);

    if (resp) {
      toast.success("Added Log", { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      toast.error("Error adding log", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    getLogs();
  };

  const handleAddLog = () => {
    const nextHiddenItem = logFormInput;
    if (
      nextHiddenItem &&
      logFormInput.subject !== "" &&
      logFormInput.description !== ""
    ) {
      inputValidation();
      addLog();
      setLogFormInput(logInitialState);
      setLogModalOpen(false);
    } else {
      inputValidation();
      return false;
    }
  };

  const handleRemoveLog = (item) => {
    setLogs((prev) => [...prev.filter((i) => i._id !== item._id)]);
    DeleteLog(item._id);
  };

  const addLogButton = (
    <Button
      variant="contained"
      onClick={handleAddLog}
      sx={{
        backgroundColor: "accent.primary",
        color: "white",
        maxWidth: "50%",
        alignSelf: "center",
        "&:hover": { backgroundColor: "accent.hover" },
      }}
    >
      Add Log
    </Button>
  );

  const handleAddLogModalClose = () => setLogModalOpen(false);
  const handleAddLogModalOpen = () => setLogModalOpen(true);

  return (
    <Box
      p={2}
      borderRadius={1}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <Typography
        variant="h6"
        fontWeight={400}
        mb={2}
        sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
      >
        Personal Logs
      </Typography>
      <IconButton
        edge="end"
        aria-label="add"
        title="Add"
        onClick={handleAddLogModalOpen}
        sx={{
          position: "absolute",
          right: "30px",
          color: "white",
          bgcolor: "accent.primary",
          "&:hover": { bgcolor: "accent.hover" },
        }}
      >
        <Add />
      </IconButton>
      <Box>
        <List>
          <TransitionGroup>
            {logs &&
              logs.map((item) => (
                <Collapse
                  key={item._id}
                  sx={{ borderBottom: "0.5px solid gray" }}
                >
                  {renderItem({ item, handleRemoveLog, formatDate })}
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      </Box>
      {logModalOpen && (
        <LogModal
          mode={mode}
          addLogButton={addLogButton}
          logModalOpen={logModalOpen}
          close={handleAddLogModalClose}
          logFormInput={logFormInput}
          setLogFormInput={setLogFormInput}
          subjectError={subjectError}
          descError={descError}
        />
      )}
    </Box>
  );
};

export default MyLogs;
