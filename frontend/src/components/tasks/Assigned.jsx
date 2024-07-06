import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/Context";
import { columns, mobileColumns } from "./TasksLayout";

const Assigned = () => {
  const { assigned } = useContext(AppContext)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const initialState = window.innerWidth < 500 ? mobileColumns : columns;
  const [columnLayout, setColumnLayout] = useState(initialState);

  const navigate = useNavigate();

  const handleBugClick = (bug) => {
    navigate("/bugview", { state: bug });
  };
  window.onresize = () => {
    if (window.innerWidth < 500) {
      setColumnLayout(mobileColumns);
    } else {
      setColumnLayout(columns);
    }
  };

  useEffect(() => {
  }, [columnLayout])

  return (
    <DataGrid
      rows={assigned}
      columns={columnLayout}
      pageSize={rowsPerPage}
      rowsPerPageOptions={[5, 10, 20, 50]}
      onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
      disableSelectionOnClick={true}
      disableColumnSelector={true}
      columnBuffer={2}
      onRowClick={(e) => handleBugClick(e.row)}
      sx={{
        '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
        },
    }}
    />
  );
};

export default Assigned;
