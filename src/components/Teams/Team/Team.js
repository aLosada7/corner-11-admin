import React from 'react';

import classes from './Team.css';
import SmallCard from '../../UI/SmallCard/SmallCard';

const team = (props) => {
    let teamPlayers = Object.keys(props.players)
    .map(player => (
        <tr key={player}>
            <td>{props.players[player].position}</td>
            <td>{props.players[player].average}</td>
            <td>{props.players[player].name}</td>
        </tr>
    ));

    let standings = Object.keys(props.standings)
    .map((team, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{props.standings[team].name}</td>
            <td>...</td>
        </tr>
    ));

    return (
        <div className={classes.TeamDetail}>
            <div className={classes.TeamHeader}>
                <h1>{props.team.name}</h1>
                <h3>{props.team.country}</h3>
            </div>
            <div className={classes.NextGames}>
                <h4 style={{textAlign: 'center'}}>Upcoming Games</h4>
                <SmallCard/>
                <SmallCard />
                <SmallCard />
                <SmallCard />
            </div>
            <div className={classes.TeamContent}>
                <div className={classes.TeamRoster}>
                    <h4 style={{textAlign: 'center'}}>Team Roster</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Average</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamPlayers}   
                        </tbody>
                    </table>
                </div>
                <div className={classes.Standings}>
                    <h4 style={{textAlign: 'center'}}>Standings</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings}   
                        </tbody>
                    </table>
                </div>
                <div className={classes.TeamInfo}>
                    <h5>Budget</h5>
                    <p>{new Intl.NumberFormat("es-ES").format(props.team.budget)} $</p>
                    <h5>Stadium capacity</h5>
                    <p>4.000</p>
                </div>
            </div>
        </div>
    )
}

export default team;