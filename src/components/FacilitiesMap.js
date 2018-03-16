import React from 'react';
import ReactMapboxGl, {Marker} from 'react-mapbox-gl';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import {FormControl} from 'material-ui/Form';
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
        const {facility, interactive = true} = this.props;
        const campusRegion = facility && facility.facility_location ? facility.facility_location.campus_region : 'fairfax';

        this.Map = ReactMapboxGl({
            accessToken: mapboxToken,
            interactive: interactive,
            attributionControl: false
        });

        this.state = {
            maxBounds: getMaxBounds(campusRegion),
            campusRegion: campusRegion,
            fitBoundsOptions: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const {facility} = nextProps;
        const campusRegion = facility && facility.facility_location ? facility.facility_location.campus_region : 'fairfax';

        this.changeRegion(campusRegion);
    }

    changeRegion = (campusRegion) => {
        this.setState({
            maxBounds: getMaxBounds(campusRegion),
            campusRegion: campusRegion
        });
    };

    render() {
        const {facilities, facility, interactive = true} = this.props;
        const {maxBounds, fitBoundsOptions} = this.state;

        let center, zoom;

        if (facility && facility.facility_location && facility.facility_location.campus_region === this.state.campusRegion) {
            center = facility.facility_location.coordinate_location.coordinates;
            zoom = [17];
        } else {
            center = [(maxBounds[0][0] + maxBounds[1][0]) / 2, (maxBounds[0][1] + maxBounds[1][1]) / 2];
            zoom = [0];
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
                fitBounds={maxBounds}
                fitBoundsOptions={fitBoundsOptions}
                zoom={zoom}
                maxBounds={maxBounds}>

                {interactive &&
                (
                    <FormControl className={'facilities-map-campus-select'}>
                        <Select
                            disableUnderline
                            value={this.state.campusRegion}
                            onChange={(e) => this.changeRegion(e.target.value)}>
                            <MenuItem value={'fairfax'}>Fairfax</MenuItem>
                            <MenuItem value={'arlington'}>Arlington</MenuItem>
                            <MenuItem value={'prince william'}>SciTech</MenuItem>
                            <MenuItem value={'front royal'}>Front Royal</MenuItem>
                        </Select>
                    </FormControl>
                )}

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