import { Avatar, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const BugDetails = ({ bug }) => {
  const { mode, userList, formatDate } = useContext(AppContext);
  const [creatorName, setCreatorName] = useState(bug.creator)
  const [creator, setCreator] = useState('');
  
  useEffect(() => {
    let temp = userList.filter(user => user.id === bug.id)

    setCreator(temp)
    
    let fullName = temp.firstName + " " + temp.lastName
    setCreatorName(fullName)
  }, [bug]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={400}
        align="left"
        mb={2}
        sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
      >
        Bug Details
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "right",
            marginBottom: "16px",
            minWidth: "200px",
            gap: "10px",
          }}
        >
          <StyledDiv sx={{ flex: 4, gap: "100px", marginBottom: "8px" }}>
            <label style={{ fontWeight: "500" }}>Title:</label>
            <span>{bug.issue}</span>
          </StyledDiv>
          <StyledDiv sx={{ flex: 1, gap: "50px" }}>
            <label
              style={{
                textAlign: "left",
                minWidth: "100px",
                fontWeight: "500",
              }}
            >
              Status:
            </label>
            <span style={{ minWidth: "100px" }}>{bug.status}</span>
          </StyledDiv>
          <StyledDiv sx={{ flex: 1, gap: "50px" }}>
            <label
              style={{
                textAlign: "left",
                minWidth: "100px",
                fontWeight: "500",
              }}
            >
              Due By:
            </label>
            <span style={{ minWidth: "100px" }}>
              {formatDate(bug.dueBy)}
            </span>
          </StyledDiv>
          <StyledDiv sx={{ flex: 1, gap: "50px" }}>
            <label
              style={{
                textAlign: "left",
                minWidth: "100px",
                fontWeight: "500",
              }}
            >
              Created:
            </label>
            <span style={{ minWidth: "100px" }}>{formatDate(bug.createdAt)}</span>
          </StyledDiv>
          <StyledDiv
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            <label
              style={{
                textAlign: "left",
                minWidth: "100px",
                fontWeight: "500",
              }}
            >
              Creator:
            </label>
            <span style={{ minWidth: "100px" }}>
              <Avatar
                alt={creatorName}
                src={creator.img}
                sx={{ marginLeft: "auto" }}
              />
            </span>
          </StyledDiv>
        </div>
        {/* <div>Statistics</div> */}
      </div>

      <div>
        <h4
          style={{
            fontWeight: 400,
            borderBottom: "0.5px solid gray",
            width: "max-content",
            marginBottom: "8px",
          }}
        >
          Information
        </h4>
        <p>
          {bug.description}
        </p>
      </div>
    </div>
  );
};

export default BugDetails;
