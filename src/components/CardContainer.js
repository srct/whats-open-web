import React from 'react'
import {withStyles} from 'material-ui/styles';
import FacilityCard from '../containers/FacilityCard'
import Grid from 'material-ui/Grid';

const CardContainer = ({classes, facilities}) => {
    return (
        <Grid container className={classes.root} spacing={24}>
            {facilities.map(item =>
                <Grid key={item.slug} item>
                    <FacilityCard facility={item}/>
                </Grid>
            )}
        </Grid>
    )
}
const styleSheet = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    }
}

export default withStyles(styleSheet)(CardContainer)