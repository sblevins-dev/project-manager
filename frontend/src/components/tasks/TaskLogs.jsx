import {
  Box,
  IconButton,
  ListItem,
  Typography,
  ListItemText,
  List,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import TaskModal from "./TaskModal";
import { AddTask, DeleteTask, GetMe } from "./TaskFunc";
import { toast } from "react-toastify";

function renderItem({ item, handleRemoveTask, formatDate }) {
  return (
    <ListItem
    sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)"}}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveTask(item)}
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
              {formatDate(item.date)}
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

const TaskLogs = () => {
  const { mode, user, setUser, formatDate, taskList, setTaskList } =
    useContext(AppContext);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  // const getLogs = async () => {
  //   const resp = await GetLogs(bug._id, user.id)

  //   setLogs(resp)
  // }

  // useEffect(() => {
  //   if (bug) {
  //     getLogs()
  //   }

  // }, [bug])

  const taskInitialState = {
    id: Math.floor(Math.random() * 1000),
    subject: "",
    description: "",
    date: new Date(),
  };

  const [taskInput, setTaskInput] = useState(taskInitialState);

  const [subjectError, setSubjectError] = useState(false);
  const [descError, setDescError] = useState(false);

  const inputValidation = () => {
    if (taskInput.subject === "") {
      setSubjectError(true);
    } else {
      setSubjectError(false);
    }
    if (taskInput.description === "") {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

  // const addLog = async () => {
  //   const resp = await AddLog(bug._id, logFormInput)
  // }

  const pullUser = async () => {
    const resp = await GetMe();

    if (!resp) {
      console.log("Error Occured");
    } else {
      setUser(resp);
    }
  };

  const handleAddTask = async () => {
    const nextHiddenItem = taskInput;
    if (
      nextHiddenItem &&
      taskInput.subject !== "" &&
      taskInput.description !== ""
    ) {
      inputValidation();
      // addLog()
      if (!taskList) {
        setTaskList([nextHiddenItem]);
      } else {
        setTaskList((prev) => [...prev, nextHiddenItem]);
      }
      const response = await AddTask(user.id, taskInput);
      console.log(response)

      if (response) {
        await pullUser();
        setTaskModalOpen(false);
        setTaskInput(taskInitialState);

        toast.success("Task Added", { position: toast.POSITION.BOTTOM_RIGHT });
      } else {
        toast.error("Error Adding Task", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      inputValidation();
      return false;
    }
  };

  const deleteTask = async (id) => {
    const resp = await DeleteTask(user.id, id);

    if (!resp) {
      console.log("error occurred");
    }
  };

  const handleRemoveTask = (item) => {
    setTaskList((prev) => [...prev.filter((i) => i.id !== item.id)]);
    deleteTask(item.id);
    pullUser();
  };

  const handleAddTaskModalClose = () => setTaskModalOpen(false);
  const handleAddTaskModalOpen = () => setTaskModalOpen(true);

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        edge="end"
        aria-label="add"
        title="Add"
        onClick={handleAddTaskModalOpen}
        sx={{
          position: "absolute",
          top: "-50px",
          right: "10px",
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
            {taskList &&
              taskList.length > 0 &&
              taskList.map((item) => (
                <Collapse
                  key={item.id}
                  sx={{ borderBottom: "0.5px solid gray" }}
                >
                  {renderItem({ item, handleRemoveTask, formatDate })}
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      </Box>
      {taskModalOpen && (
        <TaskModal
          mode={mode}
          addTask={handleAddTask}
          taskModalOpen={taskModalOpen}
          close={handleAddTaskModalClose}
          taskFormInput={taskInput}
          setTaskFormInput={setTaskInput}
          subjectError={subjectError}
          descError={descError}
        />
      )}
    </Box>
  );
};

export default TaskLogs;
