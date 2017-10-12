const addRoute = (map,geometry) =>{
    map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry":geometry 
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#4790E5",
            "line-width": 5
        }
    });
}

const getGeoLine = (mapboxClient,start,end,callback) =>{

    return new Promise((resolve, reject) => {
        mapboxClient.getDirections([
            start,
            end
            ], {
            profile: 'walking',
            alternatives: false,
            geometry: 'geojson'
            }, function(err, results) {
                resolve(results.routes[0])
            }
        );
    });
}
export {addRoute,getGeoLine};