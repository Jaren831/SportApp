import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuldIcon from '@material-ui/icons/Build';

const Sport = (props) => {
    return (
        <ListItem button>
            <ListItemIcon>
                <BuldIcon />
            </ListItemIcon>
            <ListItemText primary={props.sportName} />
        </ListItem>
    )
};

export default Sport;