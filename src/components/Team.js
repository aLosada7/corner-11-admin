import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Flag from './UI/Flag';

import * as actions from '../store/actions';
import SimpleTable from './UI/SimpleTable';

const useStyles = makeStyles((theme) => ({ 
    root: {
        flexGrow: 1,
    },
    tabs: {
        width: '100%'
    }
}));

const rosterColumns = [
    { name: '#', align: 'left', color: '#353343'},
    { name: 'Position', align: 'center', color: '#353343'},
    { name: 'Name', align: 'center', color: '#353343'},
    { name: 'Team', align: 'center', color: '#353343'},
    { name: 'Average', align: 'center', color: '#353343'},
    { name: 'Value', align: 'right', color: '#37bc9b'}
]

const gameColumns = [
    { name: 'Game', align: 'left', color: '#353343'},
    { name: 'Result', type: 'link', align: 'center', color: '#353343', font: 'bold'},
]


function createRosterData(number, position, name, age, value, price) {
    return { number, position, name, age, value, price: price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) };
}

function createGameData(game, result) {
    return { game, result }
}

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

const Team = (props) => {

    const classes = useStyles();

    let teamAvatar = props.teamInfo.name ? props.teamInfo.name.charAt(0) : '-';
    let teamRoster = null;
    let teamGames = null;
    let teamCompetitions = props.teamInfo.competition ? props.teamInfo.competition.length : 0;
    let teamBudget = props.teamInfo.budget ? props.teamInfo.budget : 0;

    useEffect(() => {
        props.onLoadTeam(props.match.params.id);
    }, []);

    teamRoster = props.teamPlayers
        .map((player) => createRosterData(player.number, player.position, player.name, player.age, player.average, player.price));

    teamGames = props.teamGames
        .map((game) => createGameData(`${game.homeTeam.name} - ${game.visitorTeam.name}`, { value: `${game.homePoints} - ${game.visitorPoints}`, link: `/game/${game._id}` }));

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container direction="column" className={classes.root} spacing={3}>
            <Grid item container spacing={1}>
                    <Grid item>
                        <Avatar>{teamAvatar}</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">{props.teamInfo.name}<div style={{ height: '2em', width: '2em', float: 'right' }}><Flag country={props.teamInfo.country} /></div></Typography>
                        <Typography variant="subtitle2">{props.teamInfo._id}</Typography>
                    </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Grid item container direction="column" xs={12} sm={9} spacing={3}>
                    <Grid item container>
                        <Card style={{ width: '100%' }}>
                            <CardContent>
                                <Grid container style={{ textAlign: 'center' }}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6">Win Percentage</Typography>
                                        <Typography variant="h3">0.00%</Typography>
                                        <Typography variant="subtitle2">0-0</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6">Active Competitions</Typography>
                                        <Typography variant="h3">{teamCompetitions}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h6">Last Game</Typography>
                                        <Typography variant="h3">85-64</Typography>
                                        <Typography variant="subtitle2">@ GSW</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item container>
                        <Paper className={classes.tabs}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Roster" />
                                <Tab label="Standings" />
                                <Tab label="Games" />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <SimpleTable 
                                    columns={rosterColumns}
                                    rows={teamRoster}
                                    showHead />
                            </TabPanel>
                            <TabPanel value={value} index={1}>Item Two</TabPanel>
                            <TabPanel value={value} index={2}>
                                <SimpleTable 
                                    columns={gameColumns}
                                    rows={teamGames} />
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card>
                        <CardContent style={{ textAlign: 'center' }}>
                            <h5>Budget</h5>
                            <p>{teamBudget.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                            <h5>Fans</h5>
                            <p>{props.teamInfo.fans}</p>
                            <h5>Stadium Name</h5>
                            <p>{props.teamInfo.arenaName}</p>
                            <h5>Stadium capacity</h5>
                            <p>{props.teamInfo.arenaSize}</p>
                            <h5>Slug</h5>
                            <p>{props.teamInfo.slug}</p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        teamInfo: state.teams.teamInfo,
        teamPlayers: state.teams.teamPlayers,
        teamStandings: state.teams.standings,
        teamGames: state.teams.games,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTeam: (teamId) => dispatch(actions.fetchTeam(teamId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);