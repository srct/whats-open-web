import React from 'react';
import Dialog, {DialogTitle, DialogContent} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import FacilityTags from './FacilityTags';
import WeekHours from './WeekHours';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import MapDialog from './MapDialog';
import TextwTitle from './TextwTitle';
import {getMaxBounds} from '../utils/mapboxUtils';
import {removeBrackets} from '../utils/nameUtils';

class FacilityDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMapOpen: false,
            maxBounds: getMaxBounds()
        }
    }

    toggleMap = e => {
        e.stopPropagation();
        this.setState({isMapOpen: !this.state.isMapOpen});
    };

    render() {
        const {facility, facilities, isOpen, onRequestClose} = this.props;
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
            <Dialog classes={{root: 'fd-dialog-root', paper: 'fd-dialog-paper'}} open={isOpen} onRequestClose={onRequestClose}>
                <Grid container className={'fd-container'}>
                    <Grid item>
                        <Grid container className={'fd-header'}>
                            <Grid item>
                                <Avatar src={require('../images/chipotleLogo.png')} />
                            </Grid>
                            <Grid item>
                                <Typography type={'headline'}>{removeBrackets(facility.facility_name)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item>
                        <TextwTitle label="Building" content={facility.facility_location.building} />
                    </Grid>


                    <Grid item className={'fd-facility-tags'}>
                        <FacilityTags facility={facility}/>
                    </Grid>

                    <Grid item className={'fd-week-hours'}>
                        <WeekHours facility={facility}/>
                    </Grid>

                    <Grid item className={'fd-toggle-map-btn-container'}>
                        <Button className={'fd-toggle-map-btn'} onClick={this.toggleMap}>Open Map</Button>
                    </Grid>
                </Grid>

                <MapDialog
                    open={isMapOpen}
                    facilities={facilities}
                    facility={facility}
                    maxBounds={maxBounds}
                    zoom={mapZoom}
                    center={mapCenter}
                    onRequestClose={this.toggleMap}
                />
            </Dialog>
        )
    }
}

export default FacilityDialog;