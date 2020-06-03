import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	drawer: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${theme.typography.drawer}px)`,
          flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        ...theme.typography.drawer
    },
}))

const Sidebar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div>
          <div className={classes.toolbar} />
            <Divider />
            <List disablePadding>
                {props.routes.map((route, index) => (
                    <ListItem 
                        key={`${route}${route.activeIndex}`} 
                        divider 
                        button 
                        component={Link} 
                        to={route.link} 
                        selected={props.value === route.activeIndex} 
                        onClick={() => { 
                            props.setOpenDrawer(false); 
                            props.setValue(route.activeIndex) 
                        }}
                        classes={{selected: classes.drawerItemSelected}}>
                        <ListItemText 
                            className={classes.drawerItem} 
                            disableTypography>
                                {route.name}
                            </ListItemText>
                    </ListItem>
                ))}
			</List>
        </div>
      );
    
    return (
        <nav className={classes.drawer} aria-label="menu items">
            { matches ? <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.openDrawer}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden> :
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>}
        </nav>
    )
}

export default Sidebar;