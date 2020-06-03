import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";

import SimpleTable from './UI/SimpleTable';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    tabs: {
        width: '100%'
    }
}));

const standingsColumns = [
    { name: 'Name', align: 'left', color: '#353343'},
    { name: 'Minutes', align: 'center', color: '#353343'},
    { name: 'Points', align: 'center', color: '#353343'},
    { name: 'Rebounds', align: 'center', color: '#353343'},
    { name: 'Assists', align: 'center', color: '#353343'},
    { name: 'Steals', align: 'right', color: '#353343'},
    { name: 'Blocks', align: 'right', color: '#353343'}
]

const actionsColumns = [
    { name: 'Time', align: 'center', color: '#353343'},
    { name: 'Action', align: 'left', color: '#353343', type: 'action'},
    { name: 'Message', align: 'center', color: '#353343'},
]

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other} >
            {value === index && (
                <Box p={3}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function createStandingsData(name, minutes, points, rebounds, assists, steals, blocks) {
    return { name, minutes, points, rebounds, assists, steals, blocks };
}

function createActionsData(time, action, message) {
    return { time, action, message };
}

const GameDetail = (props) => {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [standings, setStandings] = useState([]);
    const [actions, setActions] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let st;
        if (props.standings.localStandings) {
            st = props.standings.localStandings.map(player => createStandingsData(player.name, player.minutes, player.points, player.rebounds, player.assists, player.steals, player.blocks));
            setStandings(st)
        }
    }, [props.standings]);

    useEffect(() => {
        let st;
        if (props.actions) {
            st = props.actions.map(action => createActionsData(action.time, action.action, action.message));
            setActions(st)
        }
    }, [props.standings]);

    return (
        <Grid container direction="column" className={classes.root} spacing={3}>
            <Grid item container style={{ width: '100%' }}>
                <Paper className={classes.tabs}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Standings" />
                        <Tab label="Actions" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <SimpleTable 
                            columns={standingsColumns}
                            rows={standings}
                            showHead />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SimpleTable 
                            columns={actionsColumns}
                            rows={actions}
                             />
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);