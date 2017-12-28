import React from 'react';
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import {withStyles} from 'material-ui/styles';
import {getMaxBounds} from '../utils/mapboxUtils';
import MapDialog from './MapDialog';

const mapboxToken = "pk.eyJ1IjoibWR1ZmZ5OCIsImEiOiJjaXk2a2lxODQwMDdyMnZzYTdyb3M4ZTloIn0.mSocl7zUnZBO6-CV9cvmnA";

let starbucksLogo = new Image();
starbucksLogo.src = require('../images/starbucksSVG.svg');
starbucksLogo.width = 60;
starbucksLogo.height = 60;

const Map = ReactMapboxGl({
    accessToken: mapboxToken,
    interactive: false,
    attributionControl: false,
});

const Mark = {
    backgroundColor: '#e74c3c',
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    border: '3px solid #EAA29B',
};


class FacilitiesMap extends React.Component {
    constructor(props) {
        super(props);

        const southWestBounds = [-77.321649, 38.823919]; //Coordinates for the south-west bound
        const northEastBounds = [-77.295213, 38.835720]; //Coordinates for the north-east bound

        this.state = {
            positionReady: false,
            position: {longitude: 0, latitude: 0},
            mappedRoute: false,
            fitBounds: [southWestBounds, northEastBounds],
            maxBounds: getMaxBounds(),
            fitBoundsOptions: {},
            mapDialogOpen: false
        }
    }


    handleRequestClose = () => {
        this.setState({
            mapDialogOpen: false,
        });
    };

    render() {
        const {facilities, facility, classes, isMapOpen} = this.props;
        const {fitBounds, maxBounds, fitBoundsOptions, mapDialogOpen} = this.state;

        let center, zoom;
        try {
            center = facility.facility_location.coordinate_location.coordinates;
            zoom = [17];
        } catch (e) {
            center = [(maxBounds[0][0] + maxBounds[1][0]) / 2, (maxBounds[0][1] + maxBounds[1][1]) / 2];
            zoom = [17];
        }

        return (
            <div className={classes.mapContainer}
                 style={{'transform': isMapOpen ? 'translateY(0px)' : 'translateY(436px)'}}>
                <Map
                    animationOptions={{
                        animate: false
                    }}
                    onClick={() => {
                        this.setState({
                            mapDialogOpen: true
                        });
                    }}
                    style="mapbox://styles/mduffy8/cjbcdxi3v73hp2spiyhxbkjde"
                    movingMethod={'easeTo'}
                    containerStyle={{
                        height: "200px",
                        width: "380px",
                        margin: "10px",
                        borderRadius: '3px',
                        cursor: 'pointer',
                    }}
                    center={center}
                    fitBounds={fitBounds}
                    fitBoundsOptions={fitBoundsOptions}
                    zoom={zoom}
                    maxBounds={maxBounds}>
                    {(facilities.length > 0) && facilities.map((item) => {
                        return (
                            <Marker
                                key={item.slug}
                                coordinates={item.facility_location.coordinate_location.coordinates}
                                anchor="bottom">
                                <div style={Mark}/>
                            </Marker>
                        )
                    })}
                </Map>
                <MapDialog
                    open={mapDialogOpen}
                    facilities={facilities}
                    facility={facility}
                    maxBounds={maxBounds}
                    zoom={zoom}
                    center={center}
                    onClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

const styleSheet = {
    mapContainer: {
        transition: '250ms ease-in-out',
        width: '100%'
    }
};


export default withStyles(styleSheet)(FacilitiesMap)