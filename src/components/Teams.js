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

function createData(name, country, budget, userId, _id, search) {
  	return { 
		name, 
		country, 
		budget: budget.toLocaleString('en-US', {style: 'currency', currency: 'USD'}), 
		userId, 
		_id, 
		search 
	};
}


const Teams = (props) => {
 	const classes = useStyles();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([
		{ id: 'name', label: 'Name' },
		{ id: 'country', label: 'Country' },
		{ id: 'budget', label: 'Budget' },
		{ id: 'teamID', label: 'Team ID' }
	]);

	useEffect(() => {
        props.onInitTeams();
    }, []);


	useEffect(() => {
		const teams = props.teams.map(team => createData(team.name, team.country, team.budget, team.user, team._id, true));
		setRows(teams);
	}, [props.teams]);

	const goToTeamDetail = (event, teamId) => {
		props.history.push(`/team/${teamId}`);
	}

	const handleSearch = (event) => {
		setSearch(event.target.value);

		const rowData = rows.map(row => Object.values(row).filter(option => option !== true && option !== false));

		const matches = rowData.map(row => row.map(option => option.toLowerCase().includes(event.target.value.toLowerCase())));

		const newRows = [...rows];
		matches.map((row, index) => (row.includes(true) ? newRows[index].search = true : newRows[index].search = false));
		setRows(newRows);
		setPage(0);
	}

    return (
      <Grid container direction="column">
		  	<Grid item container direction={matchesSM ? 'column-reverse' : 'row'} alignItems="center" spacing={3}>
                <Grid item className={classes.headerContainer} xs={9}>
                    <TextField 
                        placeholder="Search for a team"
                        value={search}
                        onChange={handleSearch}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item className={classes.headerContainer} xs={3}>
                    <Button component={Link} to="/new-team" variant="outlined" className={classes.addTeamButton}>
                        <span style={{ marginRight: 10 }}>ADD TEAM +</span>
                    </Button>
                </Grid>
			</Grid>
		  	<Grid item style={{ maxWidth: '100%', marginBottom: matchesMD ? '40em' : '35em' }}>
				<EnhancedTable 
					columns={columns}
					rows={rows} 
					page={page} 
					setPage={setPage}
					handleClick={goToTeamDetail} />
			</Grid>
      </Grid>
    )
}

const mapStateToProps = state => {
    return {
        teams: state.teams.teams
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitTeams: () => dispatch(actions.fetchTeams()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);