import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import * as actions from '../store/actions';
import GameDetail from './GameDetail';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    gameHeader: {
        textAlign: 'center'
    },
    arena: {
        fontWeight: 700
    },
    score: {
        [theme.breakpoints.down("md")]: {
            fontSize: '3.50em'
        }
    },
    quarters: {
        width: '40%', 
        textAlign: 'center', 
        margin: 'auto', 
        paddingLeft: '5em',
        [theme.breakpoints.down("md")]: {
            width: '100%',
            marginLeft: '-1.5em'
        }
    },
}));

const Game = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.onInitGame(props.match.params.id);
    }, [props.token]);

    let header = null;
    let quarters = null;

    props.scoreByQuarter.push({
        "homePoints": props.game.homePoints,
        "visitorPoints": props.game.visitorPoints
    })

    if (props.game.homeTeam) {
        header = (
            <Grid item className={classes.gameHeader}>
                <Typography variant="h4">{`${props.game.homeTeam.name} - ${props.game.visitorTeam.name}`}</Typography>
                <Typography variant="h1" className={classes.score}>{`${props.game.homePoints} - ${props.game.visitorPoints}`}</Typography>
                <Typography variant="subtitle2">Arena: <span className={classes.arena}>{props.game.homeTeam.arenaName}</span></Typography>
            </Grid>
        )
        quarters = (
            <Grid item container direction="row" className={classes.quarters}>
                {props.scoreByQuarter.map((quarter, index) => 
                    <Grid item container direction="column" xs={2} md={2}>
                        <Grid item style={{ fontWeight: '700'}}>
                            {index < 4 ? index + 1 : 'Final'}
                        </Grid>
                        <Grid item>
                            {quarter.homePoints}
                        </Grid>
                        <Grid item>
                            {quarter.visitorPoints}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        )
    }

    return (
        <Grid container direction="column" justify="center" className={classes.root} spacing={5}>
            {header}
            <Grid item style={{ marginBottom: '3em'}}>
                {quarters}
            </Grid>
            <GameDetail standings={props.gameStandings} actions={props.gameActions} />
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        game: state.game.game,
        scoreByQuarter: state.game.scoreByQuarter,
        gameActions: state.game.gameActions,
        gameStandings: state.game.gameStandings
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: (gameId) => dispatch(actions.fetchGame(gameId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);