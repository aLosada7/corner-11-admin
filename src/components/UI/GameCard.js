
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({ 
    root: {
        flexGrow: 1,
        width: '100%'
    },
    gameCard: {
        padding: '1.25em',
        "&:hover": {
            backgroundColor: '#FAFAFA'
        }
    },
    teamName: {
        fontSize: '0.75em'
    },
    gameInfo: {
        textAlign: 'center',
        marginRight: '-2em'
    }
}));


const Games = (props) => {
    const classes = useStyles();

    console.log(props.game)

    const homePoints = props.game.localScore;
    const visitorPoints = props.game.visitorScore;

    return(
        <Grid item className={classes.root}>
            <Card className={classes.gameCard} onClick={() => props.detailGame(props.game.id)}>
                <CardContent>
                    <Grid container>
                        <Grid item container direction="column" xs={8} md={8} spacing={1}>
                            <Grid item container alignItems="center" spacing={1}>
                                <Grid item xs={3} md={3}>
                                    <Avatar>AV</Avatar>
                                </Grid>
                                <Grid item xs={7} md={7}>
                                    <Typography variant="h6" className={classes.teamName}>{props.game.homeTeam.name}</Typography>
                                </Grid>
                                <Grid item style={{ textAlign: 'center', fontWeight: homePoints > visitorPoints ? '700' : '200'}} xs={2} md={2}>
                                    { homePoints }
                                </Grid>
                            </Grid>
                            <Grid item container alignItems="center" spacing={1}>
                                <Grid item xs={3} md={3}>
                                    <Avatar>AV</Avatar>
                                </Grid>
                                <Grid item xs={7} md={7}>
                                <Typography variant="h6" className={classes.teamName}>{props.game.visitorTeam.name}</Typography>
                                </Grid>
                                <Grid item style={{ textAlign: 'center', fontWeight: visitorPoints > homePoints ? '700' : '200'}} xs={2} md={2}> 
                                    { visitorPoints }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" justify="center" xs={4} md={4}>
                            <Grid item className={classes.gameInfo}>
                                <Typography variant="subtitle1" color="primary">{homePoints !== 0 ? 'Final' : 'TBD'}</Typography>
                                <Typography variant="subtitle2">17/04</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Games;