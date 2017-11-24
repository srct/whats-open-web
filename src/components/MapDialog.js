
import React from 'react'
import ReactMapboxGl, { Layer, Feature,Marker,Source,GeoJSONLayer } from "react-mapbox-gl";
import MapboxClient from 'mapbox'
import mapboxgl from 'mapbox-gl'
import {withStyles} from 'material-ui/styles';
import {addRoute,getGeoLine} from '../utils/mapboxUtils';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    background: blue[100],
    color: blue[600],
  },
};
const token = "pk.eyJ1IjoibWR1ZmZ5OCIsImEiOiJjaXk2a2lxODQwMDdyMnZzYTdyb3M4ZTloIn0.mSocl7zUnZBO6-CV9cvmnA";
const Map = ReactMapboxGl({
    accessToken: token,
    attributionControl:false,
  });

  let starbucksLogo = new Image();
  starbucksLogo.src = require('../images/starbucksSVG.svg')
  starbucksLogo.width = 60
  starbucksLogo.height = 60
  const images = ['starbucks',starbucksLogo,{pixelRatio:3}]

class MapDialog extends React.Component {
  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value);
  };

  render() {
    const { classes, selectedValue,facility,facilities,zoom,center,maxBounds,...other } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <Map
        onStyleLoad={(map,e)=>{
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true
        }));
           
        }}
        onClick={(map,e)=>{
            this.setState({
                mapDialogOpen: true
            })
            console.log('changed')
        }}
        style="mapbox://styles/mapbox/streets-v9"
        movingMethod={'easeTo'}
        containerStyle={{
          height: "500px",
          width: "600px",
          borderRadius:'5px',
        }}
        center={center}
        zoom={[zoom]}
        maxBounds={maxBounds}>
         
            {(facilities.length > 0) && facilities.map((item) =>{
                    return(
                       <Marker
                            key={item.slug}
                            coordinates={item.facility_location.coordinate_location.coordinates}
                            anchor="bottom">
                            <img height={20} width={20} src={require('../images/starbucksSVG.svg')}/>
                            {/* <div style={Mark}></div> */}
                       </Marker>
                    )
            })} 
             
      </Map>
      </Dialog>
    );
  }
}

MapDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(MapDialog);
