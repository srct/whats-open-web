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
        <Grid container className={classes.root} spacing={24} justify={'center'} align={'flex-end'}>
            {facilities.filter(filterCards).map(item =>{
                return(<Grid key={item.slug} item>
                    <FacilityCard facility={item}/>
                </Grid>)
            })}
        </Grid>
    )
}
const styleSheet = {
   
    root:{
        // backgroundColor:'red',
        margin:0,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
}

export default withStyles(styleSheet)(CardContainer)