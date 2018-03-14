import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FacilitiesMap from './FacilitiesMap';

class MapDialog extends React.Component {
    handleRequestClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const {facility, facilities, campusRegion, open} = this.props;

        return (
            <Dialog onClose={this.handleRequestClose} open={open}>
                <div style={{
                    height: '500px',
                    width: '600px'
                }}>
                    <FacilitiesMap
                        facilities={facilities}
                        facility={facility}
                        interactive={true}
                        campusRegion={campusRegion}
                    />
                </div>
            </Dialog>
        );
    }
}

MapDialog.propTypes = {
    onClose: PropTypes.func,
    selectedValue: PropTypes.string
};

export default MapDialog;
