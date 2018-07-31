import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuldIcon from '@material-ui/icons/Build';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <BuldIcon />
      </ListItemIcon>
      <ListItemText primary="Soccer" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <BuldIcon />
      </ListItemIcon>
      <ListItemText primary="BasketBall" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BuldIcon />
      </ListItemIcon>
      <ListItemText primary="BaseBall" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BuldIcon />
      </ListItemIcon>
      <ListItemText primary="Football" />
    </ListItem>
  </div>
);
