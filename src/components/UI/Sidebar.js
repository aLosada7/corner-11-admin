import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import logo from '../../assets/logo.png';

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
    drawerItem: {
        display: 'flex',
        alignItems: 'center'
    },
    mobileMenuHeader: {
        background: theme.palette.common.brown
    },
    logo: {
        width: '17rem'
    }
}))

const Sidebar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    const wrapperRef = React.useRef(null);

    // below is the same as componentDidMount and componentDidUnmount
    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, [props.openDrawer]);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            if (props.openDrawer) {
                props.setOpenDrawer(false);
            }
        }
    };

    const drawer = (
        <div ref={wrapperRef}>
            {!matches ? <div className={classes.toolbar} /> : 
            <div className={classes.mobileMenuHeader}>
                <Link 
                    to="/" 
                    onClick={() => { 
                        props.setOpenDrawer(false); 
                        props.setValue(0);
                    }}>
                        <img alt="company logo" className={classes.logo} src={logo} />
                </Link>
            </div>}
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
                                <Icon style={{ marginLeft: matches ? '0rem' : '3rem' }}>{route.icon}</Icon>
                                <span style={{ marginLeft: '15px' }}>{route.name}</span>
                            </ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
      );
    
    return (
        <nav role="sidebar" className={classes.drawer} aria-label="menu items">
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