import React from 'react'
import {withStyles} from 'material-ui/styles';
import FacilityCard from '../containers/FacilityCard'
import Grid from 'material-ui/Grid';

const CardContainer = ({searchTerm, facilities}) => {
    const filterCards = (facility) => {
        const lsearchTerm = searchTerm.toLowerCase()
        const name = facility.facility_name.toLowerCase()
        const tags = facility.facility_product_tags
        tags.forEach((tag) =>{
            return tag.toLowerCase()
        })
        let hasTag = true;
        let index = tags.findIndex((tag) =>{
            return tag.includes(lsearchTerm)
        })
        if(index === -1){
            hasTag = false
        }
        return name.includes(lsearchTerm) || hasTag
     }
    //  console.log(facilities)
    return (
        <Grid container className={'card-container-root'} spacing={24} justify={'center'} alignItems={'flex-end'}>
            {facilities.filter(filterCards).map(item =>{
                return(
                    <Grid key={item.slug} item>
                        <FacilityCard facility={item} facilities={facilities}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default CardContainer;