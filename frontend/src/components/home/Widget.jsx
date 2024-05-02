import { Box } from "@mui/material";
import {
  AssignmentInd,
  AccountTree,
  BugReport,
  Assignment,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { useEffect } from "react";

const Widget = ({ type }) => {
  const {
    mode,
    projList,
    bugList,
    taskList,
    setTaskList,
    user,
    assigned,
    setAssigned,
  } = useContext(AppContext);
  const [projectPer, setProjectPer] = useState(0);

  let data;
  let pastMonthCount = 0;
  let currentMonth = 0;

  let myFunc = () => {
    let todaysDate = new Date();
    let month = todaysDate.getMonth();

    for (let i = 0; i < projList.length; i++) {
      let tempDate = new Date(projList[i].createdAt);
      let tempMonth = tempDate.getMonth();

      if (tempMonth === month) {
        currentMonth += 1;
      } else if (tempMonth - 1 === month - 1) {
        pastMonthCount += 1;
      }
    }

    let total = pastMonthCount + currentMonth;

    let percentage = (currentMonth / total) * 100;

    setProjectPer(percentage);
  };

  useEffect(() => {
    if (projList) {
      myFunc();
    }
    setAssigned(bugList.filter((bug) => bug.teamId === user.teamId));
    setTaskList(user.tasks);
  }, [projList, bugList]);

  switch (type) {
    case "projects":
      data = {
        title: "Projects",
        link: "See all",
        amt: projList.length,
      };
      break;
    case "issues":
      data = {
        title: "Issues",
        link: "See all",
        amt: bugList.length,
      };
      break;
    case "tasks":
      data = {
        title: "Tasks",
        link: "See all",
        amt: taskList.length,
      };
      break;
    case "assigned":
      data = {
        title: "Assigned",
        link: "See all",
        amt: assigned.length,
      };
      break;
    default:
      break;
  }

  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    type === "projects"
      ? navigate("/projects")
      : type === "issues"
      ? navigate("/bugs")
      : type === "tasks"
      ? navigate("/tasks")
      : type === "assigned"
      ? navigate("/tasks")
      : navigate("/");
  };

  let style = isHover
    ? {
        fontSize: "12px",
        borderBottom: "1px solid transparent",
        width: "max-content",
        backgroundColor: "#2D6675",
        borderRadius: "3px",
        cursor: "pointer",
        padding: "0 2px",
        color: "white",
        transition: "0.2s all ease-in-out",
      }
    : {
        fontSize: "12px",
        borderBottom: "1px solid gray",
        width: "max-content",
        cursor: "pointer",
      };

  return (
    <Box
      justifyContent="space-between"
      flex={12}
      p={1}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      sx={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "0",
        minWidth: '120px'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "14px", color: "gray" }}>
          {data.title}
        </span>
        <span style={{ fontSize: "28px", fontWeight: "300" }}>{data.amt}</span>
        <span
          style={style}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleClick}
        >
          {data.link}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <KeyboardArrowUp />
        <div>{data.percent}%</div> */}
        {type === "projects" ? (
          <AccountTree
            sx={{
              fontSize: "30px",
              padding: "5px",
              backgroundColor: mode === "dark" ? "accent.primary" : "white",
              borderRadius: "5px",
              alignSelf: "flex-end",
              color: mode === "dark" ? "white" : "accent.primary",
            }}
          />
        ) : type === "issues" ? (
          <BugReport
            sx={{
              fontSize: "30px",
              padding: "5px",
              backgroundColor: mode === "dark" ? "accent.primary" : "white",
              borderRadius: "5px",
              alignSelf: "flex-end",
              color: mode === "dark" ? "white" : "accent.primary",
            }}
          />
        ) : type === "tasks" ? (
          <Assignment
            sx={{
              fontSize: "30px",
              padding: "5px",
              backgroundColor: mode === "dark" ? "accent.primary" : "white",
              borderRadius: "5px",
              alignSelf: "flex-end",
              color: mode === "dark" ? "white" : "accent.primary",
            }}
          />
        ) : (
          <AssignmentInd
            sx={{
              fontSize: "30px",
              padding: "5px",
              backgroundColor: mode === "dark" ? "accent.primary" : "white",
              borderRadius: "5px",
              alignSelf: "flex-end",
              color: mode === "dark" ? "white" : "accent.primary",
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default Widget;
