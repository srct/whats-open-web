import React from 'react'
import {withStyles} from 'material-ui/styles';
import Chip from 'material-ui/Chip'

const FacilityStatus = ({classes, facility}) => {
    return (
        <Chip label={'Todo'} className={classes.chip} />
    )
};
const styleSheet = {
    chip: {
        margin: 'auto',
        height: '24px'
    }
};

export default withStyles(styleSheet)(FacilityStatus);