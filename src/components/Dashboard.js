import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import StarsIcon from '@material-ui/icons/Stars';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SimpleTable from './UI/SimpleTable';

import * as actions from '../store/actions';

const useStyles = makeStyles((theme) =>({
    root: {
        padding: '7rem'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    buttonCreateNewTeam: {
        textAlign: 'right'
    },
    greenIcon: {
        color: '#37bc9b'
    },
    redIcon: {
        color: 'red'
    },
    miniCard: {
        minWidth: '100%'
    },
    miniCardIcon: {
        width: 50,
        height: 50,
        marginTop: '20%'
    },
    wrapIcon: {
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
    card: {
        padding: '1.5em'
    }
  }));

// sixth as true if value
function createData(number, position, name, team, value, isPrice) {
    const data = isPrice ? value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : value;
    return { number, position, name, team, data} ;
}

const columnsExpensivePlayers = [
    { name: '#', align: 'left', color: '#353343'},
    { name: 'Position', align: 'center', color: '#353343'},
    { name: 'Name', align: 'center', color: '#353343'},
    { name: 'Team', align: 'center', color: '#353343'},
    { name: 'Value', align: 'right', color: '#37bc9b'}
]

const columnsBestPlayers = [
    { name: '#', align: 'left', color: '#353343'},
    { name: 'Position', align: 'center', color: '#353343'},
    { name: 'Name', align: 'center', color: '#353343'},
    { name: 'Team', align: 'center', color: '#353343'},
    { name: 'Average', align: 'right', color: 'red'}
]

const Dashboard = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.onInitReport(props.token);
    }, [props.token]);

    let expensivePlayers = props.expensivePlayers ? 
        props.expensivePlayers.map((player, index) => createData(index + 1, player.position, player.name, 'Not known', player.price, true)) : [];

    let topPlayers = props.topPlayers ? 
        props.topPlayers.map((player, index) => createData(index + 1, player.position, player.name, 'Not known', player.average)) : [];

    return(
        <Grid container direction="column">
                <Grid item container justify="center" alignItems="center" direction="row" spacing={9} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.miniCard}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4} style={{ backgroundColor: '#2f80e7', color: '#fff' }}>
                                        <PublicIcon className={classes.miniCardIcon} />
                                    </Grid>
                                    <Grid item xs={8} style={{ backgroundColor: '#5d9cec', color: '#fff' }}>
                                        <Typography variant="h2" style={{ color: '#fff' }}>{props.totals.teams}</Typography>
                                        <Typography variant="subtitle1">TEAMS</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.miniCard}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4} style={{ backgroundColor: '#564aa3', color: '#fff' }}>
                                        <PersonIcon className={classes.miniCardIcon} />
                                    </Grid>
                                    <Grid item xs={8} style={{ backgroundColor: '#7266ba', color: '#fff' }}>
                                        <Typography variant="h2" style={{ color: '#fff' }}>{props.totals.players}</Typography>
                                        <Typography variant="subtitle1">PLAYERS</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.miniCard}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4} style={{ backgroundColor: '#2b957a', color: '#fff' }}>
                                        <StarsIcon className={classes.miniCardIcon} />
                                    </Grid>
                                    <Grid item xs={8} style={{ backgroundColor: '#37bc9b', color: '#fff' }}>
                                        <Typography variant="h2" style={{ color: '#fff' }}>{props.totals.competitions}</Typography>
                                        <Typography variant="subtitle1">COMPETITIONS</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                    <Grid item container direction="column">
                                        <Grid item>
                                            <Grid container direction="row" spacing={1} alignItems="center">
                                                <Grid item>
                                                    <PlayCircleOutlineIcon className={classes.greenIcon}/>
                                                </Grid>
                                                <Grid item style={{ fontWeight: '700' }}>Most Expensive Players</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <SimpleTable 
                                                        columns={columnsExpensivePlayers}
                                                        rows={expensivePlayers}/>
                                        </Grid>
                                    </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container direction="column">
                                        <Grid item>
                                            <Grid container direction="row" spacing={1} alignItems="center">
                                                <Grid item>
                                                    <PlayCircleOutlineIcon className={classes.redIcon}/>
                                                </Grid>
                                                <Grid item style={{ fontWeight: '700' }}>Best Players</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <SimpleTable
                                                        columns={columnsBestPlayers}
                                                        rows={topPlayers} />
                                        </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        totals: state.report.totals,
        expensivePlayers: state.report.expensivePlayers,
        topPlayers: state.report.topPlayers,
        teams: state.teams.teams,
        competitions: state.competitions.competitions,
        teamPlayers: state.players.teamPlayers,
        teamStandings: state.teams.standings,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitReport: (token) => dispatch(actions.fetchReport(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);