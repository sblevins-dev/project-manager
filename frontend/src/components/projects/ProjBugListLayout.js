export const columns = [
  {
    field: "issue",
    headerName: "Issue",
    headerClassName: "gridHeader",
    flex: 3,
  },
  {
    field: "priority",
    headerName: "Priority",
    headerClassName: "gridHeader",
    flex: 1,
    align: "center",
    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "black",
            minWidth: "73px",
            textAlign: "center",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: ".8rem",
            letterSpacing: "2px",
            backgroundColor:
            cellValues.value === 4
            ? "#ffebeb"
            : cellValues.value === 3
            ? "#fff3df"
            : cellValues.value === 2
            ? "#fdffcc"
            : cellValues.value === 1
            ? "#edffeb"
            : "transparent",
            color:
            cellValues.value === 4
            ? "#ff0000"
            : cellValues.value === 3
            ? "#cc9f00"
            : cellValues.value === 2
            ? "#a0a500"
            : cellValues.value === 1
            ? "#006a13"
            : "transparent",
          }}
        >
          {cellValues.value === 4
            ? "critical"
            : cellValues.value === 3
            ? "major"
            : cellValues.value === 2
            ? "minor"
            : cellValues.value === 1
            ? "low"
            : null}
        </div>
      );
    },
  },

  { field: "createdAt", headerName: "Date", headerClassName: "gridHeader" },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "gridHeader",
    flex: 1,
    align: "center",
    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "white",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: ".8rem",
            minWidth: "73px",
            textAlign: "center",
            padding: "5px 0",
            borderRadius: "5px",
            color: cellValues.value === "Open" ? "#5da56b" : "#a8382c",
          }}
        >
          {cellValues.value}
        </div>
      );
    },
  },
];

export const mobileColumns = [
  {
    field: "issue",
    headerName: "Issue",
    headerClassName: "gridHeader",
    flex: 3,
  },
  {
    field: "priority",
    headerName: "Priority",
    headerClassName: "gridHeader",
    flex: 2,
    align: "center",
    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "black",
            minWidth: "72px",
            textAlign: "center",
            padding: "5px",
            borderRadius: "5px",
            fontSize: ".8rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color:
              cellValues.value === 4
                ? "#ff2800"
                : cellValues.value === 3
                ? "#ffae04"
                : cellValues.value === 2
                ? "#a0a500"
                : cellValues.value === 1
                ? "#006a13"
                : "transparent",
          }}
        >
          {cellValues.value === 4
            ? "Critical"
            : cellValues.value === 3
            ? "Major"
            : cellValues.value === 2
            ? "Minor"
            : cellValues.value === 1
            ? "Low"
            : null}
        </div>
      );
    },
  },
];
