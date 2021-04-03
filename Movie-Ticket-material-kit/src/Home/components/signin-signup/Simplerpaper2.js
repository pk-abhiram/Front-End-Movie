import React from 'react';
import './StylesSheet.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Signin from './Signin';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    // align: 'center',
    alignItems: 'center',
    maxWidth: 500,
    height: 600,
    // backgroundColor:'white',
    background: 'transparent',
    opacity: 0.9,
  },
  media: {
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
});

export default function SimplePaper2() {
  const classes = useStyles();

  return (
    <div className='home'>
      <Card className={classes.root}>
        <CardContent>
          <Signin />;<CardActions className={classes.media}></CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
