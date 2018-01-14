import React from 'react';
import FacilityCard from '../containers/FacilityCard';
import Grid from 'material-ui/Grid';

const CardContainer = ({searchTerm, campusRegion, facilities}) => {

    const filterCards = (facility) => {
        if (facility.facility_location.campus_region.toLowerCase() !== campusRegion.toLowerCase()) {
            return false;
        }

        const lSearchTerm = searchTerm.toLowerCase();
        const facilityName = facility.facility_name.toLowerCase();
        const facilityLocation = facility.facility_location.building.toLowerCase();
        const facilityCategory = facility.facility_category.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const facilityTags = facility.facility_product_tags;

        facilityTags.forEach((tag) => {
            return tag.toLowerCase();
        });

        const index = facilityTags.findIndex((tag) => {
            return tag.includes(lSearchTerm);
        });

        const hasTag = index !== -1;

        return facilityName.includes(lSearchTerm) || facilityLocation.includes(lSearchTerm) ||
            facilityCategory.includes(lSearchTerm) || hasTag;
    };

    return (
        <Grid container className={'card-container-root'} spacing={24} justify={'center'} alignItems={'flex-end'}>
            {facilities.filter(filterCards).map((item) => {
                return (
                    <Grid key={item.slug} item>
                        <FacilityCard facility={item} facilities={facilities} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default CardContainer;