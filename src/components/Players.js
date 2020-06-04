import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import EnhancedTable from './UI/EnhancedTable';
import * as actions from '../store/actions';
import PlayerDetail from './PlayerDetail';

const useStyles = makeStyles(theme => ({
	headerContainer: {
		[theme.breakpoints.down("xs")]: {
            minWidth: '80%'
        }
	},
	addTeamButton: {
		...theme.typography.button1,
		width: '100%'
	}
}));

function createData(position, name, team, average, age, price, _id, search) {
  	return { 
		position, 
		name, 
		team,
        age, 
        price: price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}), 
		_id, 
		search 
	};
}


const Players = (props) => {
 	const classes = useStyles();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

	const [dialogOpen, setDialogOpen] = useState(false);
	const [playerSelected, setPlayerSelected] = useState(null);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([
		{ id: 'position', label: 'Position' },
		{ id: 'name', label: 'Name' },
        { id: 'team', label: 'Team' },
        { id: 'age', label: 'Age' },
        { id: 'price', label: 'Price' },
	]);
	
	useEffect(() => {
        props.onInitPlayers();
	}, []);

	useEffect(() => {
        if (props.players) {
			const players = props.players.map(player => createData(player.position, player.name, player.team.name, player.average, player.age.toLocaleString(), player.price, player._id, true));
			console.log(players)
            setRows(players);
        }
	}, [props.players]);

	const handleSearch = (event) => {
		setSearch(event.target.value);
		console.log("value", event.target.value);

		const rowData = rows.map(row => Object.values(row).filter(option => option !== true && option !== false));

		console.log(rowData);

		const matches = rowData.map(row => row.map(option => option.toLowerCase().includes(event.target.value.toLowerCase())));

		const newRows = [...rows];
		matches.map((row, index) => (row.includes(true) ? newRows[index].search = true : newRows[index].search = false));
		setRows(newRows);
		setPage(0);
	}

	const handleDialogOpen = (event, playerId) => {
		setDialogOpen(true);
		let playerSelected = props.players.filter((player) => player._id === playerId)[0]
		setPlayerSelected(playerSelected);
	}

    return (
      <Grid container direction="column">
		  	<Grid item container direction={matchesSM ? 'column-reverse' : 'row'} alignItems="center" spacing={3}>
					<Grid item className={classes.headerContainer} xs={9}>
						<TextField 
							placeholder="Search for a player"
							value={search}
							onChange={handleSearch}
							style={{ width: '100%' }}
						/>
					</Grid>
					<Grid item className={classes.headerContainer} xs={3}>
						<Button component={Link} to="/new-team" variant="outlined" className={classes.addTeamButton} disabled>
                            <span style={{ marginRight: 10 }}>CREATE PLAYER +</span>
                        </Button>
					</Grid>
				</Grid>
		  	<Grid item style={{ maxWidth: '100%', marginBottom: matchesMD ? '40em' : '35em' }}>
				<EnhancedTable 
					columns={columns}
					rows={rows} 
					page={page} 
					setPage={setPage}
					handleClick={handleDialogOpen} />
			</Grid>
			<PlayerDetail dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} player={playerSelected}/> 
      </Grid>
    )
}

const mapStateToProps = state => {
    return {
        players: state.players.players
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPlayers: () => dispatch(actions.fetchPlayers())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);