import React from 'react'
import FacilityCard from '../containers/FacilityCard'
import Grid from 'material-ui/Grid';

const CardContainer = ({searchTerm, facilities}) => {

    const filterCards = (facility) => {
        const lSearchTerm = searchTerm.toLowerCase();
        const facilityName = facility.facility_name.toLowerCase();
        const facilityLocation = facility.facility_location.building.toLowerCase();
        const facilityCategory = facility.facility_category.name.toLowerCase();
        const facilityTags = facility.facility_product_tags;

        facilityTags.forEach((tag) => {
            return tag.toLowerCase()
        });

        let index = facilityTags.findIndex((tag) => {
            return tag.includes(lSearchTerm)
        });

        const hasTag = index !== -1;

        return facilityName.includes(lSearchTerm) || facilityLocation.includes(lSearchTerm) ||
            facilityCategory.includes(lSearchTerm) || hasTag;
    };

    return (
        <Grid container className={'card-container-root'} spacing={24} justify={'center'} alignItems={'flex-end'}>
            {facilities.filter(filterCards).map(item => {
                return (
                    <Grid key={item.slug} item>
                        <FacilityCard facility={item} facilities={facilities}/>
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default CardContainer;