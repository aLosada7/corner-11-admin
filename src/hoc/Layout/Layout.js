import React, { useState } from 'react';
import { connect } from 'react-redux'; 
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ReactAux from '../ReactAux/ReactAux';
import Toolbar from '../../components/UI/Toolbar';
import Sidebar from '../../components/UI/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  authContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px',
    marginLeft: '18.5em',
    [theme.breakpoints.down("md")]: {
      marginLeft: '0em',
    },
  },
  noAuthContent: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Layout = (props) => {

    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);

    const routes = [
      { name: "Dashboard", link: "/", icon: 'dashboard', activeIndex: 0 },
      { name: "Teams", link: "/teams", icon: 'group', activeIndex: 1},
      { name: "Players", link: "/players", icon: 'emoji_people', activeIndex: 2 },
      { name: "Games", link: "/games", icon: 'pie_chart', activeIndex: 3 }
    ]
    
    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    return(
        <ReactAux>
            {props.isAuthenticated ? <Toolbar
                    className={classes.Toolbar}
                    isAuth={props.isAuthenticated}
                    openDrawer={handleDrawerToggle}
                    /> : null }
            {props.isAuthenticated ? 
            <Sidebar
                routes={routes}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                value={value}
                setValue={setValue}
                /> : null }
            <main className={props.isAuthenticated ? classes.authContent : classes.noAuthContent}>
              {props.children}
            </main>
        </ReactAux>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);