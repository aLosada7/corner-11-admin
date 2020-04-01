import React from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './Teams.css';

const teams = (props) => {
    let teams = Object.keys(props.teams)
        .map(team => {
            const t = props.teams[team];
            return (
            <tr key={team}>
                <td>{props.teams[team].name}</td>
                <td>{props.teams[team].country}</td>
                <td><Button btnType="Success" clicked={() => props.manageTeam(t)}>Manage Team</Button></td>
            </tr>
        )});

    return (
        <div className={classes.UserTeams}>
        <div>
            <span style={{fontSize: '1.1rem'}}>Choose a team to start, or create one new.</span>
        </div>
        <div className={classes.UserTeamsTable}>
            <table>
                <thead>
                    <tr>
                        <th>TEAM NAME</th>
                        <th>TEAM LEAGUE</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {teams}   
                </tbody>
            </table>
        </div> 
        <div>
            <p style={{fontSize: '1.5rem'}}>You can have a maximum of 5 teams.</p>
            <Button btnType="Success" clicked={props.createNewTeam}>Create a new team</Button>
        </div>
    </div>
    )
}

export default teams;