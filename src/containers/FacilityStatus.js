import React from 'react';
import {withStyles} from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import {green, red} from 'material-ui/colors'

const FacilityStatus = ({classes, facility}) => {
    const isOpen = facility => {
        //TODO
        return true;
    };

    return (
        <Chip label={
            <div>
                <Typography type={'caption'} className={classes.isOpenText}>OPEN</Typography>
                <Typography type={'caption'} className={classes.timeText}>~18 Hrs</Typography>
            </div>
        } className={classes.chip} style={{backgroundColor: isOpen(facility) ? green[500] : red[500]}}/>
    )
};
const styleSheet = {
    chip: {
        margin: 'auto',
        height: '24px',
        borderRadius: '5px',
    },
    isOpenText: {
        borderRight: '1px solid white',
        paddingRight: '5px',
        color: 'white',
        fontFamily: 'Nunito',
        display: 'inline'
    },
    timeText: {
        paddingLeft: '5px',
        color: 'white',
        fontFamily: 'Nunito',
        display: 'inline'
    }
};

export default withStyles(styleSheet)(FacilityStatus);