import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import * as actions from '../store/actions';
import { generatePlayers } from '../shared/utility';
import EnhancedTable from './UI/EnhancedTable';

const useStyles = makeStyles(theme => ({
    newTeam: {
        textAlign: 'center'
    },
    teamInfo: {
        borderBottom: '1px solid #CFDBE2',
        marginTop: '2%'
    },
	newTeamButton: {
		...theme.typography.button1,
	}
}));

function createData(position, name, average, age, price, id, search) {
    return { 
        position, 
        name, 
        average,
        age, 
        price: price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}), 
        id,
        search
    };
}

const NewTeam = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([
        { id: 'position', label: 'Position' },
        { id: 'name', label: 'Name' },
		{ id: 'average', label: 'Average' },
		{ id: 'age', label: 'Age' },
		{ id: 'price', label: 'Price' }
	]);

    const state = {
        controls: {
            teamName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Team Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        notification: null,
        teamPlayers: [],
        numberOfPlayers: 0
    }

    const [teamName, setTeamName] = useState('');
    const [arenaName, setArenaName] = useState('');
    const [country, setCountry] = useState('Spain');
    const [budget, setBudget] = useState(100000000);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [numberPlayers, setNumberPlayers] = useState(0)

    useEffect(() => {
        props.onInitPlayers(generatePlayers(props.token));
    }, [props.token]);

    useEffect(() => {
        const players = props.players.map((player, index) => createData(player.position, player.name, player.average, player.age, player.price, index + 1, true));
        setRows(players);
    }, [props.players]);

    const addPlayerHandler = (playerId) => {
        let updatedTeamPlayers = state.teamPlayers;
        updatedTeamPlayers.push(playerId);

        setTeamPlayers(updatedTeamPlayers);
        setNumberPlayers(numberPlayers + 1);
        
        props.addPlayer(props.players[playerId -1]);
    }

    const removePlayerHandler = (playerId) => {
        let updatedTeamPlayers = state.teamPlayers;
        updatedTeamPlayers.splice(playerId, 1);
        
        setTeamPlayers(updatedTeamPlayers);
        setNumberPlayers(numberPlayers - 1);

        props.removePlayer(playerId - 1);
    }

    const submitTeamHandler = (event) => {
        event.preventDefault();

        if (numberPlayers >= 7 && budget > 0) {
            const team = {
                name: teamName,
                country: country,
                numberOfPlayers: props.selectedPlayers.length,
                budget: budget,
                arenaName: arenaName,
                arenaSize: 4000,
                fans: 1000,
            }
            const players = props.selectedPlayers;

            props.onNewTeam(props.token, team, players);
        } else {
            //const prevState = this.state;
            //this.setState({...prevState, notification: {type: "Error", message: "You need to add at least 7 players to your team."}})
        }
    }

    const teamCreated = props.teamCreated ? <Redirect to="" /> : null;

    const handleCheckbox = (playerId, selected) => {
        if (!selected) {
            setBudget(budget - props.players[playerId].price);
            addPlayerHandler(playerId);
        } else {
            setBudget(budget + props.players[playerId].price);
            removePlayerHandler(playerId);
        }
    }
        
    return (
        <Grid container direction="column" className={classes.newTeam}>
            {teamCreated}
            <Grid item container direction="column" className={classes.teamInfo}>
                    <Grid item>
                        <Typography variant="h4" align="center">Team Information</Typography>
                    </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField id="name" value={teamName} onChange={(event) => setTeamName(event.target.value)} label="Team Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="abrname" label="Abreviation" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField id="stadiumname" value={arenaName} onChange={(event) => setArenaName(event.target.value)} label="Stadium Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">Country</InputLabel>
                            <NativeSelect
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-helper',
                            }}
                            >
                            <option value={'Spain'}>Spain</option>
                            <option value={'Italy'}>Italy</option>
                            <option value={'Germany'}>Germany</option>
                            <option value={'France'}>France</option>
                            <option value={'United Kingdom'}>United Kingdom</option>
                            <option value={'Turkey'}>Turkey</option>
                            <option value={'Sweeden'}>Sweeden</option>
                            </NativeSelect>
                            <FormHelperText>Choose your team origin.</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container direction="column">
                <Grid item>
                    <Typography variant="h4" align="center">Team Players</Typography>
                </Grid>
                <Grid item>
                    <div className={classes.ResumeInfo}>
                        <div className={classes.Budget}>
                            {/*<p>Total Budget / Budget Available </p>*/}
                                {budget.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                        </div>
                    </div>
                </Grid>
                <Grid item style={{ maxWidth: '100%', marginBottom: '3em' }}>
                    <EnhancedTable 
                        columns={columns}
                        rows={rows} 
                        page={page} 
                        setPage={setPage}
                        orderByDirection
                        orderBy={'position'}
                        checkboxsActive
                        handleCheckbox={handleCheckbox} />
                </Grid>
            </Grid>
            <Grid item>
                <Button variant="outlined" className={classes.newTeamButton} onClick={submitTeamHandler}>Confirm New Team</Button>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        players: state.players.generatedPlayers,
        selectedPlayers: state.newTeam.selectedPlayers,
        userId: state.auth.userId,
        loadingCreate: state.newTeam.loading,
        teamCreated: state.newTeam.teamCreated,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPlayers: (token) => dispatch(actions.initGeneratedPlayers(token)),
        onNewTeam: (token, teamData, selectedPlayers) => dispatch(actions.createNewTeam(token, teamData, selectedPlayers)),
        addPlayer: (player) => dispatch(actions.addPlayerToNewTeam(player)),
        removePlayer: (playerId) => dispatch(actions.removePlayerToNewTeam(playerId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);