import React, { Component } from 'react';
import { connect } from 'react-redux';

//import classes from './Dashboard.css';
import Teams from '../../components/Teams/Teams';
import Team from '../../components/Teams/Team/Team';
import * as actions from '../../store/actions';

class Dashboard extends Component {

    state = {
        teamSelected: null
    }

    componentDidMount () {
        this.props.onInitTeams(this.props.userId);
    }

    createNewTeamHandler = () => {
        console.log("Go To Create New Team")
        this.props.history.push({
            pathname: '/new-team',
        });
    }

    loadTeamHandler = (team) => {
        this.setState({teamSelected: team});
        console.log(team.country);
        this.props.onFetchTeamPlayers(team.id);
        this.props.onLoadStandings(team.country);
    }

    render() {
        let dashboard =  null;
        if (this.props.teams) {
            dashboard = (
                <Teams 
                    teams={this.props.teams}
                    manageTeam={this.loadTeamHandler}
                    createNewTeam={this.createNewTeamHandler} />
            );
        }

        if(this.state.teamSelected && this.props.teamPlayers) {
            dashboard = (
                <Team 
                    team={this.state.teamSelected}
                    players={this.props.teamPlayers}
                    standings={this.props.teamStandings}/>
            )
        }

        return(
            <div>
                {dashboard}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.teams.teams,
        teamPlayers: state.players.teamPlayers,
        teamStandings: state.teams.standings,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitTeams: (userId) => dispatch(actions.initTeams(userId)),
        onFetchTeamPlayers: (teamId) => dispatch(actions.fetchPlayers(teamId)),
        onLoadStandings: (country) => dispatch(actions.loadStandings(country))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);