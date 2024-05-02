import {
  Avatar,
  AvatarGroup,
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Context";

const Row = ({ team }) => {
  const { userList, teamList } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  let employees = userList.filter(user => user.teamId === team._id)

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {team.teamName}
        </TableCell>
        {window.innerWidth > 500 && (
          <TableCell>
            <AvatarGroup max={4} sx={{ justifyContent: "center" }}>
              {employees.length > 0 &&
                employees.map((person) => (
                  <Avatar
                    key={person._id}
                    alt={person.firstName}
                    src={person.img}
                  />
                ))}
            </AvatarGroup>
          </TableCell>
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                mb={2}
                fontWeight={400}
                gutterBottom
                component="div"
              >
                Team Members
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="right" sx={{ paddingRight: "20px" }}>
                      Phone
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.length > 0 &&
                    employees.map((person) => (
                      <TableRow key={person._id}>
                        <TableCell component="th" scope="row">
                          {person.firstName + " " + person.lastName}
                        </TableCell>
                        <TableCell align="center">
                          {person.roles.User === 2001
                            ? "Software Engineer I"
                            : person.roles.User === 2002
                            ? "Software Engineer II"
                            : person.roles.User === 2003
                            ? "Senior Software Engineer"
                            : person.roles.User === 1000
                            ? "Team Lead"
                            : person.roles.User === 1001
                            ? "Assistant Manager"
                            : person.roles.User === 1002
                            ? "Operations Manager"
                            : person.roles.User === 1003
                            ? "Lead Manager"
                            : person.roles.User === 3000
                            ? "Test Engineer I"
                            : person.roles.User === 3001
                            ? "Test Engineer II"
                            : person.roles.User === 3002
                            ? "Test Engineer III"
                            : person.roles.User === 3003
                            ? "Test Engineer Lead"
                            : person.roles.User === 4000
                            ? "Designer I"
                            : person.roles.User === 4001
                            ? "Designer II"
                            : person.roles.User === 4002
                            ? "Designer III"
                            : person.roles.User === 4003
                            ? "Design Lead"
                            : person.roles.User === 5000
                            ? "QA Engineer I"
                            : person.roles.User === 5001
                            ? "QA Engineer II"
                            : person.roles.User === 5002
                            ? "QA Engineer III"
                            : person.roles.User === 5003
                            ? "QA Lead"
                            : person.roles.User === 5004
                            ? "QA Operations Manager"
                            : person.roles.User === 6000
                            ? "Associate I"
                            : person.roles.User === 6001
                            ? "Associate II"
                            : person.roles.User === 6002
                            ? "Associate III"
                            : person.roles.User === 6003
                            ? "Planning Lead"
                            : person.roles.User === 6004
                            ? "Planning Operations Manager"
                            : "New Employee"}
                        </TableCell>
                        <TableCell align="right">{person.phone}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const PersonnelList = ({ mode }) => {
  const { teamList } = useContext(AppContext);
  return (
    <TableContainer sx={{   }} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{
        "& .gridHeader": mode === "dark" 
        ? { color: "white", bgcolor: "transparent" }
        : { color: "accent.primary", bgcolor: "transparent"} }}>
          <TableRow>
            <TableCell />
            <TableCell color={mode === "dark" ? "white" : "accent.primary"}>Team</TableCell>
            {window.innerWidth > 500 && (
              <TableCell align="center" color={mode === "dark" ? "white" : "accent.primary"}>
                Employees
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            bgcolor: mode === "dark" ? "background.dark" : "background.light",
          }}
        >
          {teamList.map((team) => (
            <Row key={team._id} team={team} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PersonnelList;
