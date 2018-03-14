import React from 'react';
import ReactMapboxGl, {Marker} from 'react-mapbox-gl';
import {getMaxBounds} from '../utils/mapboxUtils';
import mapboxgl from 'mapbox-gl';

const mapboxToken = 'pk.eyJ1IjoibWR1ZmZ5OCIsImEiOiJjaXk2a2lxODQwMDdyMnZzYTdyb3M4ZTloIn0.mSocl7zUnZBO6-CV9cvmnA';

const Mark = {
    backgroundColor: '#e74c3c',
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    border: '3px solid #EAA29B'
};

class FacilitiesMap extends React.Component {
    constructor(props) {
        super(props);

        const {campusRegion, interactive = true} = this.props;

        const maxBounds = getMaxBounds(campusRegion);
        const southWestBounds = maxBounds[0]; //Coordinates for the south-west bound
        const northEastBounds = maxBounds[1]; //Coordinates for the north-east bound

        this.Map = ReactMapboxGl({
            accessToken: mapboxToken,
            interactive: interactive,
            attributionControl: false
        });

        this.state = {
            fitBounds: [southWestBounds, northEastBounds],
            maxBounds: maxBounds,
            fitBoundsOptions: {}
        };
    }

    render() {
        const {facilities, facility, interactive = true} = this.props;
        const {fitBounds, maxBounds, fitBoundsOptions} = this.state;

        let center, zoom;
        try {
            center = facility.facility_location.coordinate_location.coordinates;
            zoom = [17];
        } catch (e) {
            center = [(maxBounds[0][0] + maxBounds[1][0]) / 2, (maxBounds[0][1] + maxBounds[1][1]) / 2];
            zoom = [17];
        }

        return (
            <this.Map
                onStyleLoad={(map) => {
                    if (interactive) {
                        map.addControl(new mapboxgl.GeolocateControl({
                            positionOptions: {
                                enableHighAccuracy: true
                            },
                            trackUserLocation: true
                        }));
                    }
                }}
                animationOptions={{
                    animate: false
                }}
                style="mapbox://styles/mduffy8/cjbcdxi3v73hp2spiyhxbkjde"
                movingMethod={'easeTo'}
                containerStyle={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '5px',
                    cursor: 'pointer'
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
                    );
                })}
            </this.Map>
        );
    }
}

export default FacilitiesMap;