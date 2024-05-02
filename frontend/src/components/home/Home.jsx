import { Box, Divider, Typography } from "@mui/material";
import Widget from "./Widget";
import Chart from "./Chart";
import HomeList from "./HomeList";
import Featured from "./Featured";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Context";
import { toast } from "react-toastify";

const Home = () => {
  const { mode, bugList, formatDate } = useContext(AppContext);
  const [data, setData] = useState([]);
  let aug = {
    critical: 0,
    major: 0,
    minor: 0,
    low: 0,
  };
  let sep = {
    critical: 0,
    major: 0,
    minor: 0,
    low: 0,
  };
  useEffect(() => {
    bugList.forEach((bug) => {
      let date = formatDate(bug.createdAt).split(" ")[1].toLowerCase();

      if (date === "aug") {
        if (bug.priority === 4) {
          aug.critical += 1;
        } else if (bug.priority === 3) {
          aug.major += 1;
        } else if (bug.priority === 2) {
          aug.minor += 1;
        } else if (bug.priority === 1) {
          aug.low += 1;
        }
      } else if (date === "sep") {
        if (bug.priority === 4) {
          sep.critical += 1;
        } else if (bug.priority === 3) {
          sep.major += 1;
        } else if (bug.priority === 2) {
          sep.minor += 1;
        } else if (bug.priority === 1) {
          sep.low += 1;
        }
      }
    });

    setData([
      { name: "Apr", critical: 15, major: 13, minor: 18, low: 8 },
      { name: "May", critical: 14, major: 16, minor: 13, low: 4 },
      { name: "Jun", critical: 10, major: 7, minor: 4, low: 13 },
      { name: "July", critical: 5, major: 3, minor: 11, low: 15 },
      {
        name: "Aug",
        critical: aug.critical,
        major: aug.major,
        minor: aug.minor,
        low: aug.low,
      },
      {
        name: "Sep",
        critical: sep.critical,
        major: sep.major,
        minor: sep.minor,
        low: sep.low,
      },
    ]);
  }, [bugList]);

  return (
    <>
      <Box
        flex={6}
        gap={3}
        sx={{
          display: "flex",
          justifyContent: 'space-evenly',
          scrollBehavior: "smooth",
          flexWrap: "wrap",
          gap: { xs: "20px" },
        }}
      >
        <Widget type="projects" />
        <Divider flexItem orientation="vertical" sx={{color: "rgba(0, 0, 0, 0.1)"}} />
        <Widget type="issues" />
        <Divider flexItem orientation="vertical"sx={{color: "rgba(0, 0, 0, 0.1)",}} />
        <Widget type="tasks" />
        <Divider flexItem orientation="vertical" sx={{color: "rgba(0, 0, 0, 0.1)"}} />
        <Widget type="assigned" />
      </Box>
      <Divider flexItem sx={{marginY: "20px", color: "rgba(0, 0, 0, 0.1)"}} />
      <Box
        gap={3}
        mt={3}
        mb={3}
        sx={{
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: { xs: "20px" },
          minHeight: "300px",
        }}
      >
        <Box
          bgcolor={mode === "dark" ? "background.dark" : "background.default"}
          flex={2}
          p={2}
          borderRadius={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: { xs: 0 },
            width: "300px",
            minWidth: { xs: "100%", sm: "300px" },
            minHeight: "300px",
            height: "300px",
          }}
        >
          <Typography
            fontWeight={400}
            variant="h6"
            sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
          >
            Project Stages
          </Typography>
          <Featured />
        </Box>
        <Divider flexItem orientation="vertical" sx={{color: "rgba(0, 0, 0, 0.1)"}} />
        <Box
          bgcolor={mode === "dark" ? "background.dark" : "background.default"}
          flex={4}
          p={2}
          borderRadius={1}
          sx={{ width: { sm: "100%", md: "678px" } }}
        >
          <Typography
            mb={2}
            fontWeight={400}
            variant="h6"
            sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
          >
            Last 6 Months
          </Typography>
          {Array.isArray(data) && data.length > 0 && <Chart data={data} />}
        </Box>
      </Box>
      <Divider flexItem  sx={{color: "rgba(0, 0, 0, 0.1)"}} />
      <Box
        bgcolor={mode === "dark" ? "background.dark" : "background.default"}
        flex={6}
        p={2}
        borderRadius={1}
        sx={{ margin: { xs: "16px 0", sm: "0" } }}
      >
        <Typography
          mb={2}
          fontWeight={400}
          variant="h6"
          sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
        >
          Needs Immediate Attention
        </Typography>
        <HomeList />
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" }, color: "transparent" }}>
        H
      </Box>
    </>
  );
};

export default Home;
