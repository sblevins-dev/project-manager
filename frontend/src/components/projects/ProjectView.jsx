import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/Context";
import ProjBugList from "./ProjBugList";
import ProjCommentList from "./ProjCommentList";
import { GetProject } from "./GetProject";

const ProjectView = () => {
  const { mode, teamList, userList, bugList, formatDate } =
    useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [filteredList, setFilteredList] = useState(null);
  const { state } = useLocation();
  const [project, setProject] = useState(null);

  const setList = async () => {
    let temp = bugList.filter(bug => bug.projId === state.id)
    setFilteredList(temp);
  };

  const getState = async () => {
    const resp = await GetProject(state.id);
    setProject(resp);
  };

  useEffect(() => {
    getState();
    setList();

    let users = userList.filter((user) => user.teamId === state.team);
    setUsers(users);
  }, [teamList, bugList, state]);

  return (
    <>
      <Box
        p={2}
        borderRadius={1}
        height="max-content"
        bgcolor={mode === "dark" ? "background.dark" : "background.default"}
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "20px",
            maxWidth: { xs: "100%", sm: "50%" },
            paddingRight: { xs: 0, sm: "10px" },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={400}
            sx={{
              borderBottom: "0.5px solid gray",
              width: "max-content",
              maxWidth: "100%",
              wordWrap: "break-word",
            }}
          >
            {project !== null && project.projTitle}
          </Typography>
          <Box
            p={1}
            pl={3}
            pr={3}
            borderRadius="5px"
            color="white"
            bgcolor={"accent.primary"}
          >
            <Typography fontWeight={200} variant="label">
              Project Stage
            </Typography>
            <Typography>{project !== null && project.stage}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gap={4}
          flexWrap="wrap"
          textAlign="center"
          sx={{
            width: { xs: "100%", sm: "max-content" },
            justifyContent: { xs: "space-around", sm: "space-between" },
          }}
        >
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>
              {project !== null && project.company}
            </span>
            <label>Company</label>
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>
              {project !== null && formatDate(project.createdAt)}
            </span>
            <label>Start Date</label>
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>
              {project !== null && project.bugs.length}
            </span>
            <label>Issues</label>
          </span>
        </Box>
        <Box alignItems="left" sx={{ textAlign: "left" }}>
          <Typography mb={2}>Assignees</Typography>
          <Stack
            direction="row"
            display="flex"
            flexWrap="wrap"
            maxWidth={400}
            height="max-content"
            sx={{ marginBottom: "40px", gap: { xs: 1, sm: 2 }, justifyContent: {xs: 'center', sm: 'left'} }}
          >
            {userList.length > 0 &&
              users.map((user) => (
                <Avatar
                  key={user._id}
                  alt={user.firstName + user.lastName}
                  src={user.img}
                />
              ))}
          </Stack>
          {project !== null && <ProjBugList filteredList={filteredList} />}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          position="relative"
          borderRadius="5px"
          overflowY="scroll"
          maxHeight="500px"
          mt={2}
          sx={{ width: "100%" }}
        >
          <ProjCommentList state={project} />
        </Box>
      </Box>
      <Box sx={{display: {xs: 'none', sm: 'block'}, color: "transparent"}}>H</Box>
    </>
  );
};

export default ProjectView;
