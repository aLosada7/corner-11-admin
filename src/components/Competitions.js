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

function createData(name, thropyName, thropyValue, _id, search) {
  	return { 
		name, 
		thropyName, 
		thropyValue: thropyValue.toLocaleString('en-US', {style: 'currency', currency: 'USD'}), 
		_id, 
		search 
	};
}


const Competitions = (props) => {
 	const classes = useStyles();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([
		{ id: 'name', label: 'Name' },
		{ id: 'thropy', label: 'Thropy Name' },
		{ id: 'value', label: 'Value' }
    ]);
    
    useEffect(() => {
        props.onInitCompetitions();
    }, []);

	useEffect(() => {
		const competitions = props.competitions.map(comp => createData(comp.name, comp.thropyName, comp.thropyValue, comp._id, true));
		setRows(competitions);
	}, [props.competitions]);

	const handleSearch = (event) => {
		setSearch(event.target.value);

		const rowData = rows.map(row => Object.values(row).filter(option => option !== true && option !== false));

		console.log(rowData);

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
							placeholder="Search for a competition"
							value={search}
							onChange={handleSearch}
							style={{ width: '100%' }}
						/>
					</Grid>
					<Grid item className={classes.headerContainer} xs={3}>
						<Button component={Link} to="/new-team" variant="outlined" className={classes.addTeamButton} disabled>
                            <span style={{ marginRight: 10 }}>ADD COMPETITION +</span>
                        </Button>
					</Grid>
				</Grid>
		  	<Grid item style={{ maxWidth: '100%', marginBottom: matchesMD ? '40em' : '35em' }}>
				<EnhancedTable 
					columns={columns}
					rows={rows} 
					page={page} 
					setPage={setPage} />
			</Grid>
      </Grid>
    )
}

const mapStateToProps = state => {
    return {
        competitions: state.competitions.competitions
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCompetitions: (country) => dispatch(actions.fetchCompetitions(country))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Competitions);