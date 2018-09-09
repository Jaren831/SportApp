import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuldIcon from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import Sport from './Sport';

const SportList = (props) => {
  // const onClickHandler = (event) => {
  //   event.preventDefault()
  //   console.log("hello")
  //   console.log(event.target)
  // }

  return (
    <List>
      <ListItem button onClick={props.handler} key="home">
        <ListItemIcon>
          <BuldIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BuldIcon />
        </ListItemIcon>
        <ListItemText primary="League of Legends" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BuldIcon />
        </ListItemIcon>
        <ListItemText primary="Overwatch" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BuldIcon />
        </ListItemIcon>
        <ListItemText primary="DOTA 2" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BuldIcon />
        </ListItemIcon>
        <ListItemText primary="CS:GO" />
      </ListItem>
    </List>
  )
};

export default SportList;
