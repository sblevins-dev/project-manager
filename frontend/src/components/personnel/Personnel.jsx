import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import PersonnelList from "./PersonnelList";

const Personnel = () => {
  const { mode } = useContext(AppContext);

  return (
    <Box
      p={2}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      
      gap={3}
      borderRadius={1}
    >
      <Typography
        mb={2}
        fontWeight={400}
        variant="h6"
        sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
      >
        Teams
      </Typography>
      <PersonnelList mode={mode}  />
    </Box>
  );
};

export default Personnel;
