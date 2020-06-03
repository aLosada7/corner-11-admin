import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import * as actions from '../store/actions';

const useStyles = makeStyles((theme) => ({ 
    root: {
        flexGrow: 1,
    }
}));

const NewGame = (props) => {
    const classes = useStyles();

    const [homeTeam, setHomeTeam] = useState('');
    const [visitorTeam, setVisitorTeam] = useState('');

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        props.onInitTeams();
    }, []);

    useEffect(() => {
        setTeams(props.teams);
        if (props.teams.length > 0) {
            setHomeTeam(props.teams[0]._id);
            setVisitorTeam(props.teams[0]._id);
        }
    }, [props.teams]);

    const handleCreateGame = () => {
        props.onCreateGame(homeTeam, visitorTeam, props.token);
    }

    return(
        <Grid item container direction="column" spacing={3}>
            <form>
                <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                                <NativeSelect
                                value={homeTeam}
                                onChange={(event) => setHomeTeam(event.target.value)}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-helper',
                                }}
                                >
                                {teams.map(team => <option value={team._id}>{team.name}</option>)}
                                </NativeSelect>
                                <FormHelperText>Choose local team.</FormHelperText>
                            </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                                <NativeSelect
                                value={visitorTeam}
                                onChange={(event) => setVisitorTeam(event.target.value)}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-helper',
                                }}
                                >
                                {teams.map(team => <option value={team._id}>{team.name}</option>)}
                                </NativeSelect>
                                <FormHelperText>Choose visitor team.</FormHelperText>
                            </FormControl>
                    </Grid>
                </Grid>
                <Grid item>
                    <p>{homeTeam === visitorTeam ? "Same team can't play against each other" : ""}</p>
                    <Button onClick={handleCreateGame}>Create Game</Button>
                </Grid>
            </form>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        teams: state.teams.teams
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitTeams: () => dispatch(actions.fetchTeams()),
        onCreateGame: (homeTeam, visitorTeam, token) => dispatch(actions.createGame(homeTeam, visitorTeam, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);