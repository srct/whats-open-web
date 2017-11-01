import React from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import DoneIcon from 'material-ui-icons/Done';
import CloseIcon from 'material-ui-icons/Close';
import {green, red} from 'material-ui/colors'
import FacilityUtils from '../utils/facilityUtils';

const FacilityStatus = ({classes, facility}) => {

    /**
     * Generates information about the facility's status.
     *
     * @param facility The facility to get generate information about.
     * @returns {{label: string, color: *, icon: *}} Information about the facility.
     */
    const generateStatusInfo = facility => {
        let label;
        let color;
        let icon;

        if (FacilityUtils.getFacilityActiveSchedule(facility).twenty_four_hours) {
            label = 'OPEN 24/7';
            color = green[500];
            icon = <DoneIcon/>;
        } else if (FacilityUtils.isFacilityOpen(facility)) {
            label = 'OPEN';
            color = green[500];
            icon = <DoneIcon/>;
        }else {
            label = 'CLOSED';
            color = red[500];
            icon = <CloseIcon/>
        }

        return {
            label: label,
            color: color,
            icon: icon,
        }
    };

    const statusInfo = generateStatusInfo(facility);

    return (
        <Typography type={'caption'} className={classes.statusText} style={{color: statusInfo.color}}>
            {statusInfo.icon}
            {statusInfo.label}
        </Typography>
    )
};
const styleSheet = {
    statusText: {
      display: 'flex',
      alignItems: 'center'
    },
    chip: {
        height: '28px',
        borderRadius: '4px',
    },
    isOpenText: {
        color: 'white',
        display: 'inline',
    }
};

export default withStyles(styleSheet)(FacilityStatus);