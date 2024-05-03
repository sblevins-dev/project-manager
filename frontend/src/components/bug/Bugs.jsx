import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import BugsList from "./BugsList";

const Bugs = () => {
  const { mode } = useContext(AppContext)

  return (
    <Box
      p={2}
      borderRadius={1}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      height="100%"
    >
      <Typography
        variant="h5"
        fontWeight={400}
        mb={2}
        sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
      >
        Issues
      </Typography>
      <Box
        sx={{
          height: {xs: "90%", sm: "90%"},
          "& .gridHeader": { color: mode === "dark" ? "white" : "accent.primary" }
        }}
      >
        <BugsList />
      </Box>
    </Box>
  );
};

export default Bugs;
