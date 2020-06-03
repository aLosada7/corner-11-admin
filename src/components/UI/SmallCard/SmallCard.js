import React from 'react';

import classes from './SmallCard.css';

export const smallCard = (props) => {
    return(
        <div>
            <div className={classes.SmallCard}>
                <h3>NO GAMES SCHEDULED</h3>
            </div>
      </div>
    )
}

export default smallCard;