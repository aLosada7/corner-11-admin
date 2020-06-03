import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Flag from './UI/Flag';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	playerHeader: {
		padding: '4em'
    },
    average: {
        textAlign: 'center'
    }
}));

const PlayerDetail = (props) => {
    const classes = useStyles();

    let dialog = null;
    let teamAvatar = null;

    if (props.player)  {
        let player = props.player;

        teamAvatar = player.name.split(" ").map(name => name.charAt(0)).join('');

        dialog = (
        <Dialog fullWidth maxWidth="md" open={props.dialogOpen} onClose={() => props.setDialogOpen(false)}>
            <Grid item container spacing={3} className={classes.playerHeader}>
                <Grid item container xs={12} sm={9} spacing={1}>
                    <Grid item>
                        <Avatar>{teamAvatar}</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">{player.name}<div style={{ height: '2em', width: '2em', float: 'right' }}><Flag country="Italy" /></div></Typography>
                        <Typography variant="subtitle2">{`${player.position} - ${player.age} years`}</Typography>
                    </Grid>
                </Grid>
                <Grid item container direction="column" className={classes.average} xs={12} sm={3}>
                    <Typography variant="h1">{player.average}</Typography>
                    <Typography variant="subtitle2">Average</Typography>
                </Grid>
            </Grid>
            <DialogContent>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h6">Player Information</Typography>
                        <Grid container style={{ textAlign: 'center', padding: '1em' }} spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">{player.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Typography>
                                <Typography variant="subtitle2">Price</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">{player.team.name}</Typography>
                                <Typography variant="subtitle2">Team</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">{player.number}</Typography>
                                <Typography variant="subtitle2">Number</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Attibutes</Typography>
                        <Grid container style={{ textAlign: 'center', padding: '1em' }} spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">{player.attributes.pass}</Typography>
                                <Typography variant="subtitle2">Pass</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">{player.attributes.twopoints}</Typography>
                                <Typography variant="subtitle2">Two Points</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">{player.attributes.threepoints}</Typography>
                                <Typography variant="subtitle2">Three Points</Typography>
                            </Grid>
                        </Grid>
                        <Grid container style={{ textAlign: 'center', padding: '1em' }} spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{player.attributes.deffense}</Typography>
                                <Typography variant="subtitle2">Deffense</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{player.attributes.rebound}</Typography>
                                <Typography variant="subtitle2">Rebound</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog> 
        )
    }

    return (
        <Grid container>
            {dialog}
        </Grid>
    )
}

export default PlayerDetail;