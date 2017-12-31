import React from 'react';
import Typography from 'material-ui/Typography';

const FacilityCategory = ({category}) => {
    return (
        <div className={'facility-category-wrapper'}>
            <Typography type={'body1'} noWrap>
                {category.name}
            </Typography>
        </div>
    );
};

export default FacilityCategory;