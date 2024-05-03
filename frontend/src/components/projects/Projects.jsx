import { Box, Divider, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { columns, mobileColumns } from "./ProjectListLayout";

const Projects = () => {
  const { mode, projList } = useContext(AppContext);
  const [data, setData] = useState({})

  const [rowsPerPage, setRowsPerPage] = useState(10);
  let initialState = window.innerWidth < 500 ? mobileColumns : columns;
  const [columnLayout, setColumnLayout] = useState(initialState);

  const navigate = useNavigate();

  const handleProjClick = (project) => {
    navigate("/projectview", { state: project });
  };

  useEffect(() => {

    let defining = 0
    let planning = 0
    let designing = 0
    let building = 0
    let testing = 0

    projList.forEach(proj => {
      if (proj.stage === "Defining") {
        defining += 1
      } else if (proj.stage === "Planning") {
        planning += 1
      }
      else if (proj.stage === "Designing") {
        designing += 1
      }
      else if (proj.stage === "Building") {
        building += 1
      }
      else if (proj.stage === "Testing") {
        testing += 1
      }
    })

    setData({
      defining,
      planning,
      designing,
      building,
      testing
    })

  }, [projList, columnLayout])

  window.onresize = () => {
    if (window.innerHeight < 500) {
      setColumnLayout(mobileColumns);
    } else {
      setColumnLayout(columns);
    }
  };

  return (
    <Box
      p={2}
      bgcolor={mode === "dark" ? "background.dark" : "background.default"}
      borderRadius={1}
      gap={3}
      sx={{ margin: { xs: 0 }, height: "100%", minHeight: "100%", maxHeight: 'max-content' }}
    >
      <Typography
        mb={2}
        variant="h4"
        // color={"accent.primary"}
        sx={{ width: "max-content" }}
      >
        Projects
      </Typography>
      <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} />
      <Box
        p={0}
        mb={2}
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        flexDirection="row"
        width={600}
        maxWidth="100%"
        gap={1}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minWidth: "76px"
          }}
        >
          <span style={{ fontWeight: "bold" }}>{projList.length}</span>
          <label>Projects</label>
        </span>
        <Divider flexItem orientation="vertical" sx={{ color: "rgba(0, 0, 0, 0.1)" }} />
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minWidth: "76px"
          }}
        >
          <span style={{ fontWeight: "bold" }}>{data.defining}</span>
          <label>Defining</label>
        </span>
        <Divider flexItem orientation="vertical" sx={{ color: "rgba(0, 0, 0, 0.1)" }} />
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minWidth: "76px"
          }}
        >
          <span style={{ fontWeight: "bold" }}>{data.planning}</span>
          <label>Planning</label>
        </span>
        <Divider flexItem orientation="vertical" sx={{ color: "rgba(0, 0, 0, 0.1)" }} />
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minWidth: "76px"
          }}
        >
          <span style={{ fontWeight: "bold" }}>{data.designing}</span>
          <label>Desigining</label>
        </span>
        <Divider flexItem orientation="vertical" sx={{ color: "rgba(0, 0, 0, 0.1)" }} />
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minWidth: "76px"
          }}
        >
          <span style={{ fontWeight: "bold" }}>{data.building}</span>
          <label>Building</label>
        </span>
        <Divider flexItem orientation="vertical" sx={{ color: "rgba(0, 0, 0, 0.1)" }} />
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            minWidth: "76px"
          }}
        >
          <span style={{ fontWeight: "bold" }}>{data.testing}</span>
          <label>Testing</label>
        </span>
      </Box>
      <Divider flexItem sx={{color: "rgba(0, 0, 0, 0.1)", marginY: "20px"}} />
      <Box
        sx={{
          height: { xs: "70%", sm: "80%" }, width: "100%", "& .gridHeader": mode === "dark" ? { color: "white", bgcolor: "transparent" }
            : { color: "accent.primary", bgcolor: "transparent" }, '& .MuiDataGrid-root': {
              borderRight: 'none', borderLeft: 'none', borderTop: 'none', borderRadius: '0'
            },
        }}
      >
        <DataGrid
          rows={projList}
          columns={columnLayout}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
          disableColumnSelector={true}
          disableSelectionOnClick={true}
          onRowClick={(e) => handleProjClick(e.row)}
        />
      </Box>
    </Box>
  );
};

export default Projects;
