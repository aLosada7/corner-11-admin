
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";

import * as actions from '../store/actions';

import GameCard from './UI/GameCard';

const useStyles = makeStyles((theme) => ({ 
    root: {
        flexGrow: 1,
    },
    tabs: {
        width: '100%'
    },
    gameCard: {
        width: '100%'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function createData(homeTeam, visitorTeam, localScore, visitorScore, id) {
    return { 
        homeTeam, 
        visitorTeam, 
        localScore,
        visitorScore,
        id
  };
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

const Games = (props) => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [games, setGames] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        props.onInitGames();
    }, []);

    const handleDetailGame = (gameId) => {
        props.history.push(`/game/${gameId}`);
    }

    useEffect(() => {
        if (value === 0) {
            setGames(props.previousGames.map(game => createData(game.homeTeam, game.visitorTeam, game.homePoints, game.visitorPoints, game._id)));
        } else {
            setGames(props.upcomingGames.map(game => createData(game.homeTeam, game.visitorTeam, game.homePoints, game.visitorPoints, game._id)));
        }
	}, [props.previousGames, props.upcomingGames, value]);

    return(
        <Grid item container direction="column" spacing={3}>
            <Paper className={classes.tabs}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Recent Games" />
                    <Tab label="Upcoming Games" />
                </Tabs>
            </Paper>
            <Grid item container spacing={3}>
                {games.map(game => {
                    return (
                        <Grid item container key={game.id} xs={12} md={4} >
                            <GameCard 
                                game={game}
                                detailGame={handleDetailGame}/>
                        </Grid>
                    )
                })}
            </Grid>
            <Fab aria-label="create-game" className={classes.fab}>
                <Link to="/new-game"><AddIcon /></Link>
          </Fab>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        previousGames: state.game.previousGames,
        upcomingGames: state.game.upcomingGames
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGames: () => dispatch(actions.fetchGames()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
