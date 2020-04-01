import React from 'react';

import classes from './SmallCard.css';

export const smallCard = (props) => {
    return(
        <div>
            <div className={classes.SmallCard}>
                <h3>@</h3>
                <p>Team Stinson</p>
                <p>16th March</p>
            </div>
      </div>
    )
}

export default smallCard;