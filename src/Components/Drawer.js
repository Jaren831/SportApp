import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { mailFolderListItems } from './tileData';
import MatchListContainer from '../Containers/MatchListContainer';

const drawerWidth = 240;

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

function ClippedDrawer(props) {
  const { classes } = props;

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
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>{mailFolderListItems}</List>
      </Drawer>
      </div>
      <main className={classes.content}>
         <MatchListContainer currentAddress={props.currentAddress}/>
      </main>
    </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
