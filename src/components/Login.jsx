import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';import { IconButton, Popover, Typography } from "@mui/material";
import "../styles/Login.css";
import { FullscreenExit } from "@mui/icons-material";

const Login = () => {
  const clientId =
    "689765458955-clnie731bl7546rkutj2sg1he25dosia.apps.googleusercontent.com";
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    console.log("Login Success:", res);
    setUserName(res.profileObj.name);
    handleClose();
  };

  const onFailure = (err) => {
    console.log("Login failed:", err);
  };

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "login-popover" : undefined;

  return (
    <div className="login-container">
      <div className="login-button">
        <IconButton onClick={handleIconClick}>
          <AccountCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </div>

      {userName && (
        <Typography variant="body2" className="user-name">
          {userName}
        </Typography>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ padding: "16px" }}>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Popover>
    </div>
  );
};

export default Login;
