import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import classes from './NewTeam.css';
import * as actions from '../../store/actions';
import Icon from 'react-icons-kit';
import { generatePlayers } from '../../shared/utility';
import {userPlus} from 'react-icons-kit/icomoon/userPlus';
import {userMinus} from 'react-icons-kit/icomoon/userMinus';
import { updateObject, checkValidity } from '../../shared/utility';
import ReactAux from '../../hoc/ReactAux/ReactAux';

class NewTeam extends Component {
    state = {
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
            },
            league: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'sp1', displayValue: 'Spain 1'},
                        {value: 'sp2', displayValue: 'Spain 2'},
                        {value: 'sp3', displayValue: 'Spain 3'},
                        {value: 'fr1', displayValue: 'France 1'},
                        {value: 'fr2', displayValue: 'France 2'},
                        {value: 'fr3', displayValue: 'France 3'}
                    ]
                },
                value: 'sp',
                validation: {},
                valid: true
            },
        },
        teamPlayers: [],
        budgetAvailable: 100000000,
        budget: 100000000,
        numberOfPlayers: 0
    }

    componentDidMount () {
        this.props.onInitPlayers(generatePlayers());
    }


    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.controls[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
            touched: true
        });

        const updatedTeamForm = updateObject(this.state.controls, {
            [inputIdentifier]: updatedFormElement
        });
        updatedTeamForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedTeamForm) {
            formIsValid = updatedTeamForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({controls: updatedTeamForm, formIsValid: formIsValid});
    }

    addPlayerHandler = (playerId, playerPrice) => {
        console.log(playerId)
        let updatedTeamPlayers = this.state.teamPlayers;
        console.log(this.props.players[playerId]);
        updatedTeamPlayers.push(playerId);
        this.setState({
            teamPlayers: updatedTeamPlayers, 
            numberOfPlayers: this.state.numberOfPlayers + 1,
            budget: this.state.budget - playerPrice
        });
        
        this.props.addPlayer(playerId);

    }

    removePlayerHandler = (playerId, playerPrice) => {
        let updatedTeamPlayers = this.state.teamPlayers;
        updatedTeamPlayers.splice(playerId, 1);
        this.setState({
            teamPlayers: updatedTeamPlayers, 
            numberOfPlayers: this.state.numberOfPlayers - 1,
            budget: this.state.budget + playerPrice
        });

        this.props.removePlayer(playerId);
    }

    newTeamHandler = (event) => {
        event.preventDefault();

        if (this.state.numberOfPlayers >= 7) {
            const team = {
                name: this.state.controls["teamName"].value,
                country: this.state.controls["league"].value,
                numberOfPlayers: this.state.numberOfPlayers,
                budget: this.state.budgetAvailable,
                userId: this.props.userId,
            }
    
            const teamPlayers = this.props.selectedPlayers;
    
            this.props.onNewTeam(team, teamPlayers);
        }
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))
        
        let players = Object.keys(this.props.players)
            .map(player => (
                <tr key={player}>
                    <td>{this.props.players[player].position}</td>
                    <td>{this.props.players[player].name}</td>
                    <td>{this.props.players[player].average}</td>
                    <td>{this.props.players[player].age}</td>
                    <td>{new Intl.NumberFormat("es-ES").format(this.props.players[player].price)}$</td>
                    <td onClick={() => this.addPlayerHandler(player, this.props.players[player].price)}><Icon icon={userPlus} size={20} /></td>
                </tr>
            ));

            console.log(this.props.selectedPlayers);
        let selectedPlayers = Object.keys(this.props.selectedPlayers)
            .map(player => (
                <tr key={player}>
                    <td>{this.props.selectedPlayers[player].position}</td>
                    <td>{this.props.selectedPlayers[player].name}</td>
                    <td>{this.props.selectedPlayers[player].age}</td>
                    <td>{new Intl.NumberFormat("es-ES").format(this.props.selectedPlayers[player].price)}$</td>
                    <td onClick={() => this.removePlayerHandler(player, this.props.selectedPlayers[player].price)}><Icon icon={userMinus} size={20} /></td>
                </tr>
            ));

        let createTeamLoading = (
            <div></div>
        );
        
        if (this.props.loadingCreate) {
            createTeamLoading = <Spinner />
        }
        
        return (
            <ReactAux>
                {createTeamLoading}
                <div style={{marginTop: '2%'}}>
                    <form onSubmit={this.newTeamHandler}>
                        <div>
                            {form}

                            <div className={classes.ResumeInfo}>
                                <div className={classes.Budget}>
                                    {/*<p>Total Budget / Budget Available </p>*/}
                                    <p>
                                        <span className={classes.RemainingBudget}>{new Intl.NumberFormat("es-ES").format(this.state.budget)}$</span> 
                                        <span className={classes.WastedBudget}>{new Intl.NumberFormat("es-ES").format(this.state.budgetAvailable - this.state.budget)}$</span></p>
                                </div>
                                <div>
                                <Button btnType="Success">Confirm New Team</Button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.PlayersSelectionContainer}>
                            <div className={classes.PlayersSelection}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>POSITION</th>
                                            <th>PLAYER NAME</th>
                                            <th>PLAYER AVERAGE</th>
                                            <th>PLAYER AGE</th>
                                            <th>COST</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {players}
                                    </tbody>
                                </table>
                            </div>
                            <div className={classes.TeamPlayers}>
                                <p>Team Players Selected: <span>{this.state.numberOfPlayers}</span></p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>POSITION</th>
                                            <th>PLAYER NAME</th>
                                            <th>PLAYER AGE</th>
                                            <th>COST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedPlayers}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </ReactAux>
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.newTeam.players,
        selectedPlayers: state.newTeam.selectedPlayers,
        userId: state.auth.userId,
        loadingCreate: state.teams.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPlayers: (players) => dispatch(actions.initGeneratedPlayers(players)),
        onNewTeam: (teamData, teamPlayers) => dispatch(actions.createNewTeam(teamData, teamPlayers)),
        addPlayer: (playerId) => dispatch(actions.addPlayerToNewTeam(playerId)),
        removePlayer: (playerId) => dispatch(actions.removePlayerToNewTeam(playerId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);