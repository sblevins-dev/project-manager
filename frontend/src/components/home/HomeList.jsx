import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/Context";
import { columns, mobileColumns } from "./HomeListLayout";

const HomeList = () => {
  const { bugList, projList, mode } = useContext(AppContext);

  let filteredList = bugList.filter(bug => bug.priority === 4 && bug.status === "Open")

  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let initialState = window.innerHeight < 500 ? mobileColumns : columns;
  const [columnLayout, setColumnLayout] = useState(initialState);

  useEffect(() => {
  }, [bugList, columnLayout]);

  window.onresize = () => {
    if (window.innerWidth < 500) {
      setColumnLayout(mobileColumns);
    } else {
      setColumnLayout(columns);
    }
  };

  const handleBugClick = (bug) => {
    navigate("/bugview", { state: bug });
  };

  return (
    <Box
      color={mode === "dark" ? "white" : "accent.primary"}
      sx={{ height: '500px', "& .gridHeader": { color: mode === "dark" ? "white" : "accent.primary" }, }}
    >
      <DataGrid
        rows={filteredList}
        columns={columnLayout}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
        onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
        disableSelectionOnClick={true}
        disableColumnSelector={true}
        columnBuffer={2}
        onRowClick={(e) => handleBugClick(e.row)}
      />
    </Box>
  );
};

export default HomeList;
