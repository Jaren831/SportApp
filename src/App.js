import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SportList from './Components/SportList';
import MatchListContainer from './Containers/MatchListContainer';

const drawerWidth = 250;
const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 45,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      sportData: null,
      currentSport: "home"
    }
  }

  componentWillMount() {
    axios.get("https://api.pandascore.co/videogames?token=clxBpC1PwudDAMVd9lmG-gmnIBpIPy87DyXProMQ3f2SPkvtGZc", { crossDomain: true })
      .then(response => {
        // handle success
        this.setState({
          pandaData: response
        })
        console.log(response);
      })
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                SportApp
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            <SportList onClick={this.onClickHandler} />
          </Drawer>
        </div>
        <main className={classes.content}>
          <MatchListContainer />
        </main>
      </div>
    )
  }

}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
