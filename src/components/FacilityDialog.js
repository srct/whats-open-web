import React from 'react';
import Dialog from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import FacilityLabels from './FacilityLabels';
import WeekHours from './WeekHours';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import MapDialog from './MapDialog';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import {removeBrackets} from '../utils/nameUtils';

class FacilityDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMapOpen: false
        };
    }

    toggleMap = () => {
        this.setState({
            isMapOpen: !this.state.isMapOpen
        });
    };

    render() {
        const {facility, facilities, isOpen, onClose} = this.props;
        const {isMapOpen} = this.state;


        return (
            <Dialog classes={{
                root: 'fd-dialog-root',
                paper: 'fd-dialog-paper'
            }} open={isOpen} onClose={onClose}>
                <IconButton className={'fd-close-btn'} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <Grid container className={'fd-container'} justify={'center'}>
                    <Grid item className={'fd-header-container'}>
                        <Grid container className={'fd-header'}>
                            <Grid item>
                                <Avatar className={'fd-avatar'} src={facility.logo} />
                            </Grid>
                            <Grid item className={'fd-header-text-container'}>
                                <Typography className={'fd-header-text'} type={'headline'}>
                                    {removeBrackets(facility.facility_name)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item className={'fd-location-wrapper'}>
                        <Typography type={'caption'}>
                            <LocationOnIcon />
                        </Typography>
                        <Typography title={facility.facility_location.building} type={'caption'} align={'center'}>
                            {facility.facility_location.building}
                        </Typography>
                    </Grid>

                    <Grid item className={'fd-facility-labels'}>
                        <FacilityLabels facility={facility} />
                    </Grid>

                    <Grid item className={'fd-week-hours'}>
                        <WeekHours facility={facility} />
                    </Grid>

                    <Grid item className={'fd-toggle-map-btn-container'}>
                        <Button className={'fd-toggle-map-btn'} onClick={this.toggleMap}>Open Map</Button>
                    </Grid>
                </Grid>

                <MapDialog
                    open={isMapOpen}
                    facilities={facilities}
                    facility={facility}
                    fullScreen={true}
                    campusRegion={facility.facility_location.campus_region}
                    onClose={this.toggleMap}
                />
            </Dialog>
        );
    }
}

export default FacilityDialog;