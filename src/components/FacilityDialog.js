import React from 'react';
import Dialog from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import FacilityTags from './FacilityTags';
import WeekHours from './WeekHours';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import MapDialog from './MapDialog';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import {getMaxBounds} from '../utils/mapboxUtils';
import {removeBrackets} from '../utils/nameUtils';

class FacilityDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMapOpen: false,
            maxBounds: getMaxBounds()
        };
    }

    toggleMap = (e) => {
        e.stopPropagation();
        this.setState({
            isMapOpen: !this.state.isMapOpen
        });
    };

    render() {
        const {facility, facilities, isOpen, onClose} = this.props;
        const {isMapOpen, maxBounds} = this.state;

        let mapCenter, mapZoom;
        try {
            mapCenter = facility.facility_location.coordinate_location.coordinates;
            mapZoom = [17];
        } catch (e) {
            mapCenter = [(maxBounds[0][0] + maxBounds[1][0]) / 2, (maxBounds[0][1] + maxBounds[1][1]) / 2];
            mapZoom = [13];
        }

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

                    <Grid item className={'fd-facility-tags'}>
                        <FacilityTags facility={facility} />
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
                    maxBounds={maxBounds}
                    zoom={mapZoom}
                    center={mapCenter}
                    onClose={this.toggleMap}
                />
            </Dialog>
        );
    }
}

export default FacilityDialog;