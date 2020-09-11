import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MaterialToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import logo from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: '1400',
      [theme.breakpoints.down("md")]: {
        zIndex: '0',
      },
    },
    logo: {
      height: '3.5em',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down("xs")]: {
        textAlign: 'center'
    }
    },
  }));

const Toolbar = (props) =>  {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const handleLogOut = () => {
      props.logout();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <MaterialToolbar>
                  { matches ? <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={props.openDrawer}
                      className={classes.menuButton}
                    >
                    <MenuIcon />
                  </IconButton> : null}
                    <Typography variant="h6" className={classes.title}>
                      <Link to="/" ><img alt="company logo" className={classes.logo} src={logo} /></Link>
                    </Typography>
                    { matches ? null : <Button color="inherit" onClick={handleLogOut}>Log Out</Button> }
                </MaterialToolbar>
            </AppBar>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
}

export default connect(null, mapDispatchToProps)(Toolbar);