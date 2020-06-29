import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const spinner = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item container direction="column">
                <CircularProgress />
                <p>{props.message}</p>
            </Grid>
        </div>
    );
}

export default spinner;