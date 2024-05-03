import { Box, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import Assigned from "./Assigned";
import TaskLogs from "./TaskLogs";

const Tasks = () => {
  const { mode, user } = useContext(AppContext);
  useEffect(() => { }, [user]);

  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Box
        borderRadius={1}
        p={2}
        sx={{
          bgcolor: mode === "dark" ? "background.dark" : "background.default",
          "& .gridHeader": mode === "dark" ? { color: "white", bgcolor: "transparent" }
            : { color: "accent.primary", bgcolor: "transparent" },
        }}
      >
        <Typography
          mb={2}
          variant="h4"
          sx={{ width: "max-content" }}
        >
          Tasks
        </Typography>
        <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} />
        <TaskLogs />
      </Box>
      {/* <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} /> */}
      <Box
        borderRadius={1}
        p={2}
        sx={{
          bgcolor: mode === "dark" ? "background.dark" : "background.default",
          "& .gridHeader": mode === "dark" ? { color: "white", bgcolor: "transparent" }
            : { color: "accent.primary", bgcolor: "transparent" }, '& .MuiDataGrid-root': {
              borderRight: 'none', borderLeft: 'none', borderTop: 'none', borderRadius: '0'
            },
        }}
      >
        <Typography
          mb={2}
          variant="h6"
          sx={{ width: "max-content" }}
        >
          Assigned
        </Typography>
        <Box height={500}>
          <Assigned />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'inline' }, color: "transparent" }}>H</Box>
    </Box>
  );
};

export default Tasks;
