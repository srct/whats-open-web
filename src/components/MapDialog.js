import React from 'react';
import ReactMapboxGl, {Marker} from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

const mapboxToken = 'pk.eyJ1IjoibWR1ZmZ5OCIsImEiOiJjaXk2a2lxODQwMDdyMnZzYTdyb3M4ZTloIn0.mSocl7zUnZBO6-CV9cvmnA';

const Map = ReactMapboxGl({
    accessToken: mapboxToken,
    attributionControl: false
});

class MapDialog extends React.Component {
    handleRequestClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    render() {
        const {facilities, zoom, center, maxBounds, ...other} = this.props;

        return (
            <Dialog onClose={this.handleRequestClose} {...other}>
                <Map
                    onStyleLoad={(map) => {
                        map.addControl(new mapboxgl.GeolocateControl({
                            positionOptions: {
                                enableHighAccuracy: true
                            },
                            trackUserLocation: true
                        }));

                    }}
                    onClick={() => {
                        this.setState({
                            mapDialogOpen: true
                        });
                    }}
                    style="mapbox://styles/mduffy8/cjbcdxi3v73hp2spiyhxbkjde"
                    movingMethod={'easeTo'}
                    containerStyle={{
                        height: '500px',
                        width: '600px',
                        borderRadius: '5px'
                    }}
                    center={center}
                    zoom={zoom}
                    maxBounds={maxBounds}>
                    {(facilities.length > 0) && facilities.map((item) => {
                        return (
                            <Marker
                                key={item.slug}
                                coordinates={item.facility_location.coordinate_location.coordinates}
                                anchor="bottom">
                                <img style={{
                                    objectFit: 'contain'
                                }} height={40} width={40} src={item.logo} />
                            </Marker>
                        );
                    })}
                </Map>
            </Dialog>
        );
    }
}

MapDialog.propTypes = {
    onClose: PropTypes.func,
    selectedValue: PropTypes.string
};

export default MapDialog;
