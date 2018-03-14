import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FacilitiesMap from './FacilitiesMap';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class MapDialog extends React.Component {
    handleRequestClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const {facility, facilities, campusRegion, open, width, height, fullScreen = false} = this.props;

        return (
            <Dialog onClose={this.handleRequestClose} open={open} fullScreen={fullScreen}>
                <div style={{
                    height: height || '100%',
                    width: width || '100%'
                }}>
                    <IconButton className={'map-dialog-close-btn'} onClick={this.handleRequestClose}>
                        <CloseIcon />
                    </IconButton>

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
