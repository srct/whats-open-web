import React from 'react'
import ReactMapboxGl, { Layer, Feature,Marker,Source,GeoJSONLayer } from "react-mapbox-gl";
import MapboxClient from 'mapbox'
import mapboxgl from 'mapbox-gl'
import {withStyles} from 'material-ui/styles';
import {addRoute,getGeoLine} from '../utils/mapboxUtils';

const token = "pk.eyJ1IjoibWR1ZmZ5OCIsImEiOiJjaXk2a2lxODQwMDdyMnZzYTdyb3M4ZTloIn0.mSocl7zUnZBO6-CV9cvmnA";
let starbucksLogo = new Image();
starbucksLogo.src = require('../images/starbucksSVG.svg')
starbucksLogo.width = 60
starbucksLogo.height = 60
const images = ['starbucks',starbucksLogo,{pixelRatio:3}]
const Map = ReactMapboxGl({
  accessToken: token,
});
const client = new MapboxClient(token);

const Mark = {
backgroundColor: '#e74c3c',
borderRadius: '50%',
width: '12px',
height: '12px',
border: '3px solid #EAA29B',
};



class FacilitiesMap extends React.Component { 
    constructor(props){
        super(props)
        var sw = new mapboxgl.LngLat(-77.307045, 38.827285);
        var ne = new mapboxgl.LngLat(-77.303368,38.831866);
        var llb = new mapboxgl.LngLatBounds(sw, ne);
        this.state = {
            positionReady:false,
            position:{longitude:0,latitude:0},
            mappedRoute:false,
            fitBounds:[
                [ -77.321649,38.823919], // Southwest coordinates
                [ -77.295213,38.835720]  // Northeast coordinates
            ],
            maxBounds:[
                [ -77.321649,38.823919], // Southwest coordinates
                [ -77.295213,38.835720]  // Northeast coordinates
            ],
            fitBoundsOptions:{
            }
        }
    }
    componentWillMount = () =>{

        if ("geolocation" in navigator) {
            const t1 = performance.now();
            navigator.geolocation.getCurrentPosition((position) =>{
                const newCoords = position.coords
                this.setState({
                    position:position.coords,
                    positionReady:true,
                })
                const t2 = performance.now()
                console.log("took "+(t2-t1)/1000 + " seconds to load your current position")
            })
         } else {
            console.log('geolocation is not availabe for your computer')
        }
    }

    // componentWillReceiveProps = (nextProps) =>{
    //     try {
    //         const coordsArr = nextProps.facility.facility_location.coordinate_location.coordinates
    //         const coordsObj = {latitude:coordsArr[1],longitude:coordsArr[0]}
    //         if(this.state.positionReady){
    //             getGeoLine(client,this.state.position,coordsObj,()=>{}).then((route)=>{
    //                 const coords = route.geometry.coordinates
    //                 const bounds = coords.reduce(function(bounds, coord) {
    //                     return bounds.extend(coord);
    //                 }, new mapboxgl.LngLatBounds(coords[0], coords[0]));
    //                 const boundsArr = [[bounds._sw.lng,bounds._sw.lat],[bounds._ne.lng,bounds._ne.lat]]
    //                 console.log(bounds)
    //                 console.log(boundsArr)
    //                 this.setState({
    //                     mappedRoute:coords,
    //                     fitBounds:boundsArr,
    //                     fitBoundsOptions:{padding:20},
    //                 })
    //             })
    //         }
    //     }catch(e){

    //     }
    // }


    render (){ 
        const {facilities,facility,classes,isMapOpen} = this.props
        const {position,positionReady,fitBounds,maxBounds,mappedRoute,fitBoundsOptions} = this.state
        console.log(fitBounds)
        return(
        <div className={classes.mapContainer} style={{'height': isMapOpen ? '400px' : 0}}>
        <Map
        onStyleLoad={(map,e)=>{
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
        }}
        style="mapbox://styles/mapbox/streets-v9"
        movingMethod={'easeTo'}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        fitBounds={fitBounds} 
        fitBoundsOptions={fitBoundsOptions} 
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
        </div>
    )
}
}
const styleSheet  = {
    mapContainer: {
        transition: '250ms ease-in-out'
    }
};


export default withStyles(styleSheet)(FacilitiesMap)

// {<Layer
//     type="line"
//     layout={{"line-join": "round","line-cap": "round"}}
//     paint={{"line-color": "#888","line-width": 5}}
//   >
//   {mappedRoute && <Feature coordinates={mappedRoute}/>}
//   </Layer>} 