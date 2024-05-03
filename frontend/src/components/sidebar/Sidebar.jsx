import {
  AccountBox,
  Group,
  Home,
  ModeNight,
  AccountTree,
  Assignment,
  BugReport,
  BorderLeft
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
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import Add from "./Add";
import { toast } from "react-toastify"
import { logout } from "../profile/ProfileService";
import darkLogo from "../../images/logoDark.png";
import LogoutIcon from '@mui/icons-material/Logout';

const StyledImg = styled(`img`)({
  maxHeight: '40px',
})



const Sidebar = () => {
  const { mode, setMode, setAuth } = useContext(AppContext)
  const navigate = useNavigate();

  const StyledNavLink = styled(NavLink)(({theme}) => ({
    textDecoration: "none",
    listStyleType: "none",
    color: "white",
    '&.active': {
      color: theme.palette.accent.primary,
      '& > .listItem': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }
    }
  }));

  const StyledListBtn = styled(ListItemButton)({
    '&:hover': {
      backgroundColor: mode === "dark" ? 'default' : '#1b1b1b'
    }
  })

  const handleLogout = () => {
    logout();
    navigate("/");
    setAuth(false);
  };

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
      <List pb={0} sx={{ height: "100%", paddingTop: '10px' }}>
        <StyledNavLink to="/">
          <ListItem className="listItem" disablePadding >
            <StyledListBtn>
              <ListItemIcon>
                <Home sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/projects">
          <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <AccountTree sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/bugs">
          <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <BugReport sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Issues" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/tasks">
          <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Assignment sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <StyledNavLink to="/personnel">
          <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Group sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Personnel" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        {/* <StyledNavLink to="/settings">
          <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <Settings sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink> */}

        <StyledNavLink to="/profile">
          <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <AccountBox sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </StyledListBtn>
          </ListItem>
        </StyledNavLink>

        <ListItem className="listItem" disablePadding>
            <StyledListBtn>
              <ListItemIcon>
                <LogoutIcon sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
              </ListItemIcon>
              <ListItemText primary="Log Out" sx={{color: 'white'}} onClick={handleLogout} />
            </StyledListBtn>
          </ListItem>

        <ListItem className="listItem" disablePadding>
          <StyledListBtn>
            <ListItemIcon>
              <ModeNight sx={{ padding: "2px", color: "white", borderRadius: '5px',  }} />
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
