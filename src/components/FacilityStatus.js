import React from 'react';
import Typography from 'material-ui/Typography';
import FacilityUtils from '../utils/facilityUtils';
import classNames from 'classnames';

const FacilityStatus = ({facility}) => {

    /**
     * Generates information about the facility's status.
     *
     * @returns {{label: string, color: *, icon: *}} Information about the facility.
     */
    const generateStatusInfo = () => {
        let label;
        let isOpen;

        if (FacilityUtils.isFacilityOpen(facility)) {
            label = 'OPEN';
            isOpen = true;
        } else {
            label = 'CLOSED';
            isOpen = false;
        }

        return {
            label: label,
            isOpen: isOpen
        };
    };

    const statusInfo = generateStatusInfo();

    return (
        <Typography type={'caption'}
                    className={classNames('facility-status-text', statusInfo.isOpen ? 'facility-status-open' : 'facility-status-closed')}>
            {statusInfo.label}
        </Typography>
    );
};

export default FacilityStatus;