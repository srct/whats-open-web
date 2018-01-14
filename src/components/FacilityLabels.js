import React from 'react';
import Chip from 'material-ui/Chip';

const FacilityLabels = ({facility}) => {
    return (
        <div className={'label-chip-holder'}>
            {facility.facility_labels && facility.facility_labels.map((label) =>
                <Chip className={'label-chip'} key={label} label={label} />
            )}
        </div>
    );
};

export default FacilityLabels;