import React from 'react';
import Chip from 'material-ui/Chip';

const FacilityTags = ({facility}) => {
    return (
        <div className={'tag-chip-holder'}>
            {facility.facility_product_tags && facility.facility_product_tags.map(tag =>
                <Chip className={'tag-chip'} key={tag} label={tag}/>
            )}
        </div>
    )
};

export default FacilityTags;