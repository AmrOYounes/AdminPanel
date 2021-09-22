import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RawabiLogo from "../../assets/Rawabi_Logo.png";
import "./Navbar.styles.scss";
// import MenuIcon from '@material-ui/icons/Menu';

export default class Navbar extends Component {
  render() {
    return (
      <Grid container xs={12} className="navbar-container">
        <AppBar position="static" className="Appbar-style">
          <Toolbar className="toolbar-style">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src={RawabiLogo} alt="RawabiLogo" />
            </IconButton>
            <Typography variant="h4" className="navbar-title">
              Drone Administrator
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}
