import { Box, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import BugsList from "./BugsList";

const Bugs = () => {
  const { mode } = useContext(AppContext)

  return (
    <Box
      p={2}
      borderRadius={1}
      bgcolor={mode === "dark" ? "#1e1e1e" : "background.default"}
      height="100%"
    >
      <Typography
        variant="h4"
        mb={2}
        sx={{ width: "max-content" }}
      >
        Issues
      </Typography>
      <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} />
      <Box
        sx={{
          height: {xs: "90%", sm: "90%"},
          "& .gridHeader": { color: mode === "dark" ? "white" : "accent.primary" }, '& .MuiDataGrid-root': {
            borderRight: 'none', borderLeft: 'none', borderTop: 'none', borderRadius: '0'
          },
        }}
      >
        <BugsList />
      </Box>
    </Box>
  );
};

export default Bugs;
