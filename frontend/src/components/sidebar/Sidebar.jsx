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
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Switch,
  Typography,
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
})



const Sidebar = () => {
  const { mode, setMode } = useContext(AppContext)

  const StyledNavLink = styled(NavLink)({
    textDecoration: "none",
    listStyleType: "none",
    color: "white",
    
  });

  const StyledListBtn = styled(ListItemButton)({
    '&:hover': {
      backgroundColor: mode === "dark" ? 'default' : '#1b1b1b'
    }
  })

  useEffect(() => {
    toast.success("Welcome", {position: toast.POSITION.BOTTOM_RIGHT})
  }, [])

  return (
    <Paper position="fixed" gap="20px" pb={0} sx={{ backgroundColor: mode === "dark" ? "#121212a" : "black",  paddingBottom: 0, height: "100%",  borderRadius: '0px', display: {xs: 'none', sm: 'block'}, borderRight: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Box pl={2} pt={2} height={'70px'} sx={{  borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
          
            <StyledImg
              src={darkLogo}
            />
        </Box>
        
        {/* <Divider flexItem sx={{color: mode === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.1)", marginY: "20px"}} /> */}
      <List pb={0} sx={{ height: "100%" }}>
        <StyledNavLink to="/">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Home sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/projects">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <AccountTree sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/bugs">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <BugReport sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Issues" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/tasks">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Assignment sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/personnel">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Group sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Personnel" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        {/* <StyledNavLink to="/settings">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Settings sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink> */}

        <StyledNavLink to="/profile">
          <ListItem disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <AccountBox sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <ListItem disablePadding>
          <StyledListBtn>
            <ListItemIcon>
              <ModeNight sx={{ padding: "2px", color: "accent.primary", borderRadius: '5px',  }} />
            </ListItemIcon>
            <Switch
              onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
            />
          </StyledListBtn>
        </ListItem>
      </List>
        <Typography variant="h6" sx={{color: "white", position: 'fixed', bottom: 80, left: 50}}>Add Bug</Typography>
        <Add />
      
    </Paper>
  );
};

export default Sidebar;
