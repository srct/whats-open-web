/**
 * paints geojson data onto map
 *
 * @param map object
 * @param geojson object
 */
const addRoute = (map, geometry) => {
    map.addLayer({
        id: 'route',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: geometry
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#4790E5',
            'line-width': 5
        }
    });
};
/**
 * Gets directions from start coord to end cood and returns a geojson line object
 *
 * @param mapbox client object
 * @param start coordinate
 * @param end coordinate
 * @returns {Promise} the line object
 */
const getGeoLine = (mapboxClient, start, end) => {

    return new Promise((resolve) => {
        mapboxClient.getDirections([
            start,
            end
        ], {
            profile: 'walking',
            alternatives: false,
            geometry: 'geojson'
        }, (err, results) => {
            resolve(results.routes[0]);
        }
        );
    });
};
/**
 * Calculates the number of days between dayFrom and dayTo.
 *
 * @returns {array} the bounds of the George Mason Fairfax Campus
 */
const getMaxBounds = () => {
    return [
        [-77.321649, 38.823919], // Southwest coordinates
        [-77.295213, 38.835720]  // Northeast coordinates
    ];
};

export {addRoute, getGeoLine, getMaxBounds};