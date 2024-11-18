import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Popover, Typography, Button } from "@mui/material";
import "../styles/Login.css";

const Login = () => {
  const clientId =
    "689765458955-clnie731bl7546rkutj2sg1he25dosia.apps.googleusercontent.com";
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

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
    setUserName(res.profileObj.name);
    setUserEmail(res.profileObj.email);
    handleClose();
  };

  const onFailure = (err) => {
    console.log("Login failed:", err);
  };

  const handleIconClick = (event) => {
    if (!userName) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "login-popover" : undefined;

  const handleLogout = () => {
    setUserName(null);
    setUserEmail(null);
  };

  return (
    <div className="login-container">
      {/* Icono de login */}
      {!userName ? (
        <div className="login-button">
          <IconButton onClick={handleIconClick}>
            <AccountCircleIcon sx={{ color: "white", fontSize: "2.8rem" }} />
          </IconButton>
        </div>
      ) : (
        // Si el usuario está autenticado
        <div className="user-info">
          <Typography variant="h5" className="user-name">
            Bienvenido, {userName}
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      )}

      {/* Popover para el login */}
      {!userName && (
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
          <div className="popover-content">
            <GoogleLogin
              clientId={clientId}
              buttonText="Iniciar sesión con Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              className="google-login-button"
            />
          </div>
        </Popover>
      )}
    </div>
  );
};

export default Login;
