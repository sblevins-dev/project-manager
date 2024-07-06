import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { columns, mobileColumns } from "./BugsListLayout";
import { AppContext } from "../../context/Context";

const BugsList = () => {
  const { bugList, projList } = useContext(AppContext);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const initialState = window.innerWidth < 500 ? mobileColumns : columns;
  const [columnLayout, setColumnLayout] = useState(initialState);

  useEffect(() => {
  }, [bugList, columnLayout])

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

  return (
    <DataGrid
      rows={bugList}
      columns={columnLayout}
      pageSize={rowsPerPage}
      rowsPerPageOptions={[5, 10, 15, 20, 50]}
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

export default BugsList;
