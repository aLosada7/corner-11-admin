import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './UI/Theme';

import * as actions from '../store/actions';

import Dashboard from './Dashboard';
import Auth from './Auth';
import NewTeam from './NewTeam';
import Team from './Team';
import Layout from '../hoc/Layout/Layout';
import Teams from './Teams';
import Players from './Players';
import Game from './Game';
import Games from './Games';
import NewGame from './NewGame';

const App = (props) => {
	useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
		props.onTryAutoSignup();
		props.fetchTeams();
	}, []);
  
	let routes = (
			<Switch>
				<Route path="/" component={Auth} />
			</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
                <Route path="/" component={Dashboard} exact />
                <Route path="/new-team" component={NewTeam} />
                <Route path="/new-game" component={NewGame} />
                <Route path="/team/:id" component={Team} />
                <Route path="/teams" component={Teams} />
                <Route path="/players" component={Players} />
                <Route path="/game/:id" component={Game} />
                <Route path="/games" component={Games} />
			</Switch>
		)
	} 

	return (
		<ThemeProvider theme={theme}>
			<Layout>
				{routes}
			</Layout>
		</ThemeProvider>
	);
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
		fetchTeams: () => dispatch(actions.fetchTeams())
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
