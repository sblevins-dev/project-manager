import {
  Avatar,
  AvatarGroup,
  Box,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { AppContext } from "../../context/Context";
import ProjBugList from "./ProjBugList";
import ProjCommentList from "./ProjCommentList";
import ProjWidget from "./ProjWidget";
import { GetProject } from "./GetProject";

const StyledDiv = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
});

const ProjectView = () => {
  const { mode, teamList, userList, bugList, formatDate } =
    useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [lowPriority, setLowPriority] = useState(0);
  const [filteredList, setFilteredList] = useState(null);
  const { state } = useLocation();
  const [project, setProject] = useState(null);

  const setList = async () => {
    let temp = [];
    for (let i = 0; i < state.bugs.length; i++) {
      temp.push(bugList.find(obj => obj.id === state.bugs[i]))
    }
    setFilteredList(temp)
  }

  const check = filteredList === null

  let findTeam = teamList;

  let minorPriority = 0;

  // let data = [
  //   {
  //     name: "Low",
  //     uv: lowPriority,
  //     pv: 9800,
  //     fill: "#55ff04",
  //   },
  //   {
  //     name: "Minor",
  //     uv: minorPriority,
  //     pv: 1398,
  //     fill: "#eaf600",
  //   },
  //   {
  //     name: "Major",
  //     uv: 12,
  //     pv: 4567,
  //     fill: "#ffae04",
  //   },
  //   {
  //     name: "Critical",
  //     uv: 5,
  //     pv: 2400,
  //     fill: "#ff2800",
  //   },
  // ];

  // const calcPriorities = (list) => {
  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i].priority === 1) {
  //       setLowPriority(lowPriority += 1)
  //     } else if (list[i].priority === 2) {
  //       minorPriority += 1;
  //     }
  //   }
  // };

  const getState = async () => {
    const resp = await GetProject(state.id);
    setProject(resp);
  };

  useEffect(() => {
    getState();
    setList()

    findTeam = teamList.filter((team) => team.teamName === state.team);
    let temp = findTeam[0];
    let usersTemp = [];

    for (let user in userList) {
      if (temp.empIds.indexOf(userList[user]._id) !== -1) {
        usersTemp.push(userList[user]);
      }
    }
    setUsers(usersTemp);

    // calcPriorities(filteredList);
  }, [teamList, bugList, state]);

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      flexDirection="column"
      width="100%"
      margin="auto"
      gap={3}
      height="100%"
    >
      {/* <StyledDiv>
        <ProjWidget mode={mode} type="barchart" />
        <ProjWidget mode={mode} type="radialbar" />
      </StyledDiv> */}
      <Box
        p={2}
        boxShadow={5}
        borderRadius="5px"
        bgcolor={mode === "dark" ? "background.dark" : "background.default"}
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
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
            boxShadow={5}
            bgcolor={"accent.primary"}
          >
            <Typography fontWeight={200} variant="label">
              Project Stage
            </Typography>
            <Typography>Design</Typography>
          </Box>
        </Box>
        {/* <Box
          height={300}
          sx={{
            top: 0,
            right: 0,
            width: { xs: "100%", sm: "45%" },
            height: { xs: "170px" },
            position: { xs: "relative", sm: "absolute" },
          }}
        >
          {console.log(data)}
          {data.length > 0 && (
            <ResponsiveContainer>
              <RadialBarChart
                width={400}
                height={250}
                innerRadius="20%"
                // outerRadius="100%"
                data={data}
                startAngle={180}
                endAngle={0}
                barCategoryGap={3}
                cy={"80%"}
                cx={"60%"}
                outerRadius="120%"
              >
                <RadialBar
                  minAngle={15}
                  label={{ fill: "#666", position: "insideStart" }}
                  background
                  clockWise={true}
                  dataKey="uv"
                />
                <Legend
                  iconSize={10}
                  width={120}
                  height={140}
                  layout="vertical"
                  verticalAlign="middle"
                  align="left"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          )}
        </Box> */}

        <Box
          mb={2}
          p={0}
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          gap={4}
          flexWrap="wrap"
          textAlign="center"
          sx={{ width: { xs: "100%", sm: "max-content" } }}
        >
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>{project !== null && project.company}</span>
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
        <Box mb={2} alignItems="left" sx={{ textAlign: "left" }}>
          <Typography mb={2}>Assignees</Typography>
          <Stack
            direction="row"
            spacing={3}
            display="flex"
            flexWrap="wrap"
            maxWidth={400}
            height="max-content"
            sx={{ marginBottom: "40px" }}
          >
            {userList.length > 0 && users.map((user) => (
              <Avatar
                key={user._id}
                alt={user.firstName + user.lastName}
                src={user.img}
              />
            ))}
          </Stack>
        </Box>
        {project !== null && <ProjBugList filteredList={filteredList} />}
        
      </Box>
      <ProjCommentList state={project} />
    </Box>
  );
};

export default ProjectView;
