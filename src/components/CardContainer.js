import React from 'react'
import {withStyles} from 'material-ui/styles';
import FacilityCard from '../containers/FacilityCard'
import Grid from 'material-ui/Grid';
import fuzzysearch from 'fuzzysearch';

const CardContainer = ({classes, searchTerm,facilities}) => {
    const filterCards = (facility) => {
        const name = facility.facility_name.toLowerCase()
        return name.includes(searchTerm.toLowerCase())
    }
    return (
        <Grid container className={classes.root} spacing={24} justify={'center'}>
            {facilities.filter(filterCards).map(item =>{
                return(<Grid key={item.slug} item>
                    <FacilityCard facility={item}/>
                </Grid>)
            })}
        </Grid>
    )
}
const styleSheet = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        overflowY:'scroll',
    }
}

export default withStyles(styleSheet)(CardContainer)