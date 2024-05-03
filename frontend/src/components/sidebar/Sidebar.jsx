import {
  AccountBox,
  Group,
  Home,
  ModeNight,
  AccountTree,
  Assignment,
  BugReport
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Switch,
} from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/Context";
import Add from "./Add";
import { toast } from "react-toastify"
import lightLogo from "../../images/logoLight.png";
import darkLogo from "../../images/logoDark.png";

const StyledImg = styled(`img`)({
  maxHeight: '40px',
  marginLeft: '20px',
  marginTop: '20px'
})

const Sidebar = () => {
  const { mode, setMode } = useContext(AppContext)

  const StyledNavLink = styled(NavLink)({
    textDecoration: "none",
    listStyleType: "none",
    color: mode === "dark" ? "white" : "black",
  });

  useEffect(() => {
    toast.success("Welcome", {position: toast.POSITION.BOTTOM_RIGHT})
  }, [])

  return (
    <Paper position="fixed" gap="20px" pb={0} sx={{ paddingBottom: 0, height: "100%",  borderRadius: '0px', display: {xs: 'none', sm: 'block'}, borderRight: "1px solid rgba(255, 255, 255, 0.1)" }}>
        {mode === "dark" ? (
            <StyledImg
              src={darkLogo}
            />
        ) : (
            <StyledImg
              src={lightLogo}
            />
        )}
      <List pb={0} sx={{ backgroundColor: "background.dark", height: "100%" }}>
        <StyledNavLink to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/projects">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountTree sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/bugs">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BugReport sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/tasks">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Assignment sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/personnel">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Group sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Personnel" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>

        {/* <StyledNavLink to="/settings">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Settings sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink> */}

        <StyledNavLink to="/profile">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ModeNight sx={{ padding: "2px", color: mode==="dark" ? "white" : "accent.primary", borderRadius: '5px', bgcolor: mode === "dark" ? "accent.primary" : "white" }} />
            </ListItemIcon>
            <Switch
              onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Add />
    </Paper>
  );
};

export default Sidebar;
