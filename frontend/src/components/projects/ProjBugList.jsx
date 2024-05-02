import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { columns, mobileColumns } from "./ProjBugListLayout";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";

const ProjBugList = ({ state, filteredList }) => {
  const { formatDate } = useContext(AppContext);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let initialState = window.innerHeight < 500 ? mobileColumns : columns;
  const [columnLayout, setColumnLayout] = useState(initialState);

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

  useEffect(() => {
    filteredList.forEach((bug) => {
      bug.createdAt = formatDate(bug.createdAt);
    });
  }, [filteredList, columnLayout]);

  return (
    <Box
      sx={{
        height: filteredList.length > 0 ? 370 : 0,
        width: "100%",
        "& .gridHeader": { color: "accent.primary", bgcolor: "transparent" },
      }}
    >
      {state !== null && filteredList !== null && filteredList.length > 0 && (
        <DataGrid
          rows={filteredList}
          sx={{
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "20px",
            },
          }}
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
          columns={columnLayout}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
          disableColumnSelector={true}
          disableSelectionOnClick={true}
          onRowClick={(e) => handleBugClick(e.row)}
        />
      )}
    </Box>
  );
};

export default ProjBugList;
