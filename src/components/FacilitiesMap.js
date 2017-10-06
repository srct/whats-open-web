import React from 'react'
import ReactMapboxGl, { Layer, Feature,Marker } from "react-mapbox-gl";
import {withStyles} from 'material-ui/styles';
var bounds = [
    [ -77.321649,38.823919], // Southwest coordinates
    [ -77.295213,38.835720]  // Northeast coordinates
];
let starbucksLogo = new Image();
starbucksLogo.src = require('../images/starbucksSVG.svg')
starbucksLogo.width = 60
starbucksLogo.height = 60
const images = ['starbucks',starbucksLogo,{pixelRatio:3}]
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibWR1ZmZ5OCIsImEiOiJjaXk2a2lxODQwMDdyMnZzYTdyb3M4ZTloIn0.mSocl7zUnZBO6-CV9cvmnA",
});

class FacilitiesMap extends React.Component { 
    constructor(props){
        super(props)
        this.state = {
            center:[0,0] 
        }
    }
   
    render (){ 
        const {facilities,facility,classes} = this.props
        let center, zoom;
        try{
           center = facility.facility_location.coordinate_location.coordinates;
           zoom = [17];
        }catch(e){
           center = [-77.307959,38.829841]
           zoom = [13];
        }
        return(
        <div>
        <Map
        style="mapbox://styles/mapbox/light-v9"
        movingMethod={'easeTo'}
        containerStyle={{
          height: "400px",
          width: "400px"
        }}
        center={center}
        zoom={zoom}
        maxBounds={bounds}>
         
            {(facilities.length > 0) && facilities.map((item) =>{
                    return(
                       <Marker
                            key={item.slug}
                            coordinates={item.facility_location.coordinate_location.coordinates}
                            anchor="bottom">
                            <img height={20} width={20} src={require('../images/starbucksSVG.svg')}/>
                       </Marker>
                    )
            })} 
      </Map>
        </div>
    )
}
}
const styleSheet  = {

}


export default withStyles(styleSheet)(FacilitiesMap)