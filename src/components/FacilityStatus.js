import React from 'react';
import Typography from 'material-ui/Typography';
import FacilityUtils from '../utils/facilityUtils';
import classNames from 'classnames';

const FacilityStatus = ({facility}) => {

    /**
     * Generates information about the facility's status.
     *
     * @param facility The facility to get generate information about.
     * @returns {{label: string, color: *, icon: *}} Information about the facility.
     */
    const generateStatusInfo = facility => {
        let label;
        let isOpen;

        if (FacilityUtils.getFacilityActiveSchedule(facility).twenty_four_hours) {
            label = 'OPEN 24/7';
            isOpen = true;
        } else if (FacilityUtils.isFacilityOpen(facility)) {
            label = 'OPEN';
            isOpen = true;
        } else {
            label = 'CLOSED';
            isOpen = false;
        }

        return {
            label: label,
            isOpen: isOpen,
        }
    };

    const statusInfo = generateStatusInfo(facility);

    return (
        <Typography type={'caption'} className={classNames('facility-status-text', statusInfo.isOpen ? 'facility-status-open' : 'facility-status-closed')}>
            {/*{statusInfo.icon}*/}
            {statusInfo.label}
        </Typography>
    )
};

export default FacilityStatus;