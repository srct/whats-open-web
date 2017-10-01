import React from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
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

const FacilitiesMap = ({classes,facility,facilities}) => {
    if(typeof(facility.coordinate_location)==="undefined"){
        facility.coordinate_location = {
            "type": "Point",
            "coordinates": [
                -77.30893491622413,
                38.83167634001073
            ]
        }
    }
    console.log(facilities)
    return(
        <div>
        <Map
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "400px",
          width: "400px"
        }}
        maxBounds={bounds}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "starbucks" }}
            images={images}>
            {(facilities.length > 0) && facilities.map((item) =>{
                    return(
                       <Feature key={item.slug} coordinates={item.facility_location.coordinate_location.coordinates}/> 
                    )
            })} 
            <Feature coordinates={[-77.30893491622413,38.83167634001073]}/>
          </Layer>
      </Map>
        </div>
    )
}
const styleSheet  = {

}



export default withStyles(styleSheet)(FacilitiesMap)