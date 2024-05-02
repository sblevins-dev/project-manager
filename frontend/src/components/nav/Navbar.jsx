import {
  AppBar,
  Avatar,
  // Badge,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/Context";
import { logout } from "../profile/ProfileService";
import lightLogo from "../../images/logoLight.png";
import darkLogo from "../../images/logoDark.png";
import { useEffect } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 10px",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const { mode, setAuth, user } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setAuth(false);
  };

  return (
    <AppBar

      position="sticky"
      backgroundColor={"white"}
      sx={{ borderRadius: "0px",  paddingLeft: "0", boxShadow: "none",  }}
    >
      <StyledToolbar
        disableGutters
        
        sx={{
          backgroundColor:
           "transparent",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)"  
        }}
      >
        {mode === "dark" ? (
            <img
              src={darkLogo}
              style={{ maxHeight: "40px", paddingLeft: "5px" }}
            />
        ) : (
            <img
              src={lightLogo}
              style={{ maxHeight: "40px", paddingLeft: "5px" }}
            />
        )}

        <Icons
          onClick={handleClick}
          sx={{
            height: "50px",
            padding: "5px 10px",
            borderRadius: "5px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: mode === "dark" ? "background.dark" : "#ededed",
            },
          }}
        >
          {/* <Badge badgeContent={4} color="warning">
            <Notifications color="primary" />
          </Badge> */}
          <Avatar
            sx={{ width: 30, height: 30, "&:hover": { cursor: "pointer" } }}
            src={user.img}
          />
          <Typography
            variant="span"
            sx={{ color: mode === "dark" ? "white" : "black" }}
          >
            {user.firstName + " " + user.lastName}
          </Typography>
        </Icons>
        <UserBox>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={user.img}
            onClick={handleClick}
          />
          <Typography
            variant="span"
            sx={{ color: mode === "dark" ? "white" : "black" }}
          >
            {user.firstName}
          </Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleMenuClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
