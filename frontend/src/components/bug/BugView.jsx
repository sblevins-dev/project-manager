import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/Context";
import BugComments from "./BugComments";
import BugDetails from "./BugDetails";
import MyLogs from "./MyLogs";
import { GetBug } from "./GetBug"

const BugView = () => {
  const { mode } = useContext(AppContext);
  const {state} = useLocation();
  const [bug, setBug] = useState(state)

  const getState = async () => {
    const resp = await GetBug(state.id);
    setBug(resp);
  };

  useEffect(() => {
    getState()
  }, [])

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* <Box
        flex={6}
        p={2}
        m={2}
        borderRadius="5px"
        bgcolor={mode === "dark" ? "background.dark" : "background.light"}
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div>Bug</div>
        <div>Bug</div>
        <div>Bug</div>
        <div>Bug</div>
        <div>Bug</div>
      </Box> */}
      <Box
        flex={6}
        p={2}
        borderRadius={1}
        bgcolor={mode === "dark" ? "background.dark" : "background.default"}
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <BugDetails bug={bug} />
      </Box>
      <MyLogs bug={bug}/>
      <Box>
        <BugComments bug={bug} />
      </Box>
      <Box sx={{display: {xs: 'none', sm: 'block'}, color: "transparent"}}>H</Box>
    </Box>
  );
};

export default BugView;
