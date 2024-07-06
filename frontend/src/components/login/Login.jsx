import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import login from "../../images/login.jpg";
import React from "react";
import { useState } from "react";
import { loginFunc, demoFunc } from "./LoginService";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { toast } from 'react-toastify'
import lightLogo from "../../images/logoLight.png";

const Login = () => {
  const { setAuth, setUser } = useContext(AppContext);
  const initialState = {
    username: "",
    password: "",
  };

  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const [nameError, setNameError] = useState(false);
  const [passError, setPassError] = useState(false);

  const inputValidation = () => {
    if (formInput.username === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (formInput.password === "") {
      setPassError(true);
    } else {
      setPassError(false);
    }
  };

  const handleLogin = async (e) => {
    if (formInput.username !== "" || formInput.password !== "") {
      try {
        let response = await loginFunc(formInput);
        if (response) {
          setAuth(true);
          setUser(response);
        }
      } catch (err) {
        toast.error("Incorrect Username/Password Combination", { position: toast.POSITION.BOTTOM_RIGHT })
      }
    } else {
      inputValidation()
    }
  };

  const handleDemo = async (e) => {
    try {
      let response = await demoFunc();
      if (response) {
        setAuth(true);
        setUser(response);
      }
    } catch (err) {
      console.log("Login Error");
    }
  };

  return (
    <Paper
      sx={{
        height: "100vh",
        maxHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        width="50%"
        height="100%"
        sx={{
          backgroundImage: `url(${login})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          display: { xs: "none", sm: "block" },
          position: 'relative'
        }}
      >
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        </Box>
      </Box>
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        gap={3}
        sx={{ width: { xs: "100%", sm: "50%" } }}
      >
        <Box>
          <img src={lightLogo} alt="light-logo" />
          <Typography variant="subtitle2" sx={{textAlign: "right"}}>Project Manager</Typography>
        </Box>


        <Box
          p={2}
          display="flex"
          flexDirection="column"
          gap={4}
          sx={{ width: { xs: "100%", sm: "300px", md: "400px" }, }}
        >
          <TextField
            variant="filled"
            name="username"
            value={formInput.username}
            label="Username"
            onChange={handleChange}
            error={nameError}
          />
          <TextField
            variant="filled"
            type="password"
            name="password"
            value={formInput.password}
            label="Password"
            onChange={handleChange}
            error={passError}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              sx={{
                bgcolor: "accent.primary",
                color: "white",
                minWidth: "100px",
                transition: "0.2s all ease-in-out",
                "&:hover": { bgcolor: "accent.hover" },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              sx={{
                bgcolor: "accent.primary",
                color: "white",
                minWidth: "100px",
                transition: "0.2s all ease-in-out",
                "&:hover": { bgcolor: "accent.hover" },
              }}
              onClick={handleDemo}
            >
              Demo
            </Button>

          </div>
          <Typography variant="subtitle1" sx={{ alignSelf: 'center' }}>Click Demo to login or test Authorization</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
