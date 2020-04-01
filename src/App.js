import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';

import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './containers/Auth/Auth';
import NewTeam from './containers/NewTeam/NewTeam';
import Layout from './hoc/Layout/Layout';

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignup();
	}
  
	render() {
		let routes = (
				<Switch>
					<Route path="/auth" component={Auth} />
					<Redirect to="/auth" />
				</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
						<Route path="/new-team" component={NewTeam} />
						<Route path="/" exact component={Dashboard} />
						<Redirect to="/" />
				</Switch>
			)
		} 
    
		return (
		<div className="App">
			<Layout>
				{routes}
			</Layout>
		</div>
		);
  	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
