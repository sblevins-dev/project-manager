import { Box, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import PersonnelList from "./PersonnelList";

const Personnel = () => {
  const { mode } = useContext(AppContext);

  return (
    <Box
      p={2}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      sx={{"& .gridHeader": { color: mode === "dark" ? "white" : "accent.primary" }}}
      gap={3}
      borderRadius={1}
    >
      <Typography
        mb={2}
        variant="h4"
        sx={{ width: "max-content" }}
      >
        Teams
      </Typography>
      <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} />
      <PersonnelList mode={mode}  />
    </Box>
  );
};

export default Personnel;
